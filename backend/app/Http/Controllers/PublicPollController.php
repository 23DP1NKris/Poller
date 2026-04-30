<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use App\Models\PollResponse;
use App\Models\PollResponseAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PublicPollController extends Controller
{
    public function index(Request $request)
    {
        $user = auth('sanctum')->user();

        $polls = Poll::where('status', 'active')
            ->where('is_public', true)
            ->when($user, fn($q) => $q->where('user_id', '!=', $user->id))
            ->withCount(['responses', 'questions'])
            ->orderByDesc('created_at')
            ->paginate(20);

        return response($polls);
    }

    public function show(Request $request, Poll $poll)
    {
        if ($poll->status !== 'active') {
            return response(['message' => 'Aptauja nav aktīva.'], 403);
        }

        if (!$poll->is_public) {
            return response(['message' => 'Aptauja nav publiski pieejama.'], 403);
        }

        $poll->load(['questions' => function ($query) {
            $query->orderBy('order')->with(['options' => function ($q) {
                $q->orderBy('order')->withCount('responses as votes_count');
            }]);
        }]);

        $hasVoted = false;
        if (!$poll->allow_multiple_votes) {
            $user = auth('sanctum')->user();
            $sessionToken = $request->header('X-Session-Token');
            $query = PollResponse::where('poll_id', $poll->id);
            if ($user) {
                $query->where('user_id', $user->id);
            } elseif ($sessionToken) {
                $query->where('session_token', $sessionToken);
            }
            $hasVoted = $query->exists();
        }

        return response(['poll' => $poll, 'has_voted' => $hasVoted]);
    }

    public function respond(Request $request, Poll $poll)
    {
        if ($poll->status !== 'active') {
            return response(['message' => 'Aptauja nav aktīva.'], 422);
        }

        if (!$poll->is_public) {
            return response(['message' => 'Aptauja nav publiski pieejama.'], 403);
        }

        $user = auth('sanctum')->user();

        if ($poll->requires_auth && !$user) {
            return response(['message' => 'Lai atbildētu uz šo aptauju, jāreģistrējas sistēmā.'], 401);
        }

        if ($user && $user->id === $poll->user_id) {
            return response(['owner_voted' => true], 200);
        }

        $poll->load('questions.options');

        $questionIds = $poll->questions->pluck('id')->toArray();

        $data = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|integer',
            'answers.*.option_ids' => 'required|array|min:1',
            'answers.*.option_ids.*' => 'required|integer',
        ]);

        $sessionToken = $request->header('X-Session-Token') ?: Str::random(64);
        $userId = $user?->id;

        if (!$poll->allow_multiple_votes) {
            $existingQuery = PollResponse::where('poll_id', $poll->id);
            if ($userId) {
                $existingQuery->where('user_id', $userId);
            } else {
                $existingQuery->where('session_token', $sessionToken);
            }
            if ($existingQuery->exists()) {
                return response(['message' => 'Jūs jau esat atbildējuši uz šo aptauju.'], 422);
            }
        }

        DB::transaction(function () use ($data, $poll, $userId, $sessionToken, $questionIds) {
            $response = PollResponse::create([
                'poll_id' => $poll->id,
                'user_id' => $userId,
                'session_token' => $userId ? null : $sessionToken,
            ]);

            foreach ($data['answers'] as $answerData) {
                $questionId = $answerData['question_id'];
                $optionIds = $answerData['option_ids'];

                if (!in_array($questionId, $questionIds)) continue;

                $question = $poll->questions->firstWhere('id', $questionId);
                if (!$question) continue;

                $validOptionIds = $question->options->pluck('id')->toArray();
                $filteredOptionIds = array_values(
                    array_filter($optionIds, fn($id) => in_array($id, $validOptionIds))
                );

                if (empty($filteredOptionIds)) continue;

                $allowedOptionIds = $question->is_multiple_choice
                    ? $filteredOptionIds
                    : [$filteredOptionIds[0]];

                foreach ($allowedOptionIds as $optionId) {
                    PollResponseAnswer::create([
                        'response_id' => $response->id,
                        'question_id' => $questionId,
                        'option_id' => $optionId,
                    ]);
                }
            }
        });

        return response(['message' => 'Atbildes iesniegtas veiksmīgi!'], 201);
    }
}
