<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use App\Models\PollQuestion;
use App\Models\PollOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PollController extends Controller
{
    public function index(Request $request)
    {
        $polls = Poll::where('user_id', $request->user()->id)
            ->with(['questions' => function ($query) {
                $query->orderBy('order')->with(['options' => function ($q) {
                    $q->orderBy('order')->withCount('responses as votes_count');
                }]);
            }])
            ->withCount('responses')
            ->orderByDesc('created_at')
            ->get();

        return response(['polls' => $polls]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:250',
            'status' => 'required|in:draft,active',
            'is_anonymous' => 'boolean',
            'show_stats' => 'boolean',
            'allow_multiple_votes' => 'boolean',
            'is_public' => 'boolean',
            'requires_auth' => 'boolean',
            'expires_at' => 'nullable|date|after:now',
            'categories' => 'nullable|array',
            'categories.*' => 'string|max:50',
            'questions' => 'required|array|min:1',
            'questions.*.text' => 'required|string|max:255',
            'questions.*.is_multiple_choice' => 'boolean',
            'questions.*.is_required' => 'boolean',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.options.*' => 'required|string|max:255',
        ], [
            'title.required' => 'Aptaujas nosaukums ir obligāts.',
            'title.max' => 'Aptaujas nosaukums nedrīkst pārsniegt 100 rakstzīmes.',
            'description.max' => 'Apraksts nedrīkst pārsniegt 250 rakstzīmes.',
            'status.required' => 'Aptaujas statuss ir obligāts.',
            'status.in' => 'Nederīgs aptaujas statuss.',
            'expires_at.date' => 'Lūdzu ievadiet derīgu datumu.',
            'expires_at.after' => 'Aptaujas beigām ir jābūt nākotnē.',
            'questions.required' => 'Aptaujai jābūt vismaz vienam jautājumam.',
            'questions.min' => 'Aptaujai jābūt vismaz vienam jautājumam.',
            'questions.*.text.required' => 'Katram jautājumam jābūt tekstam.',
            'questions.*.text.max' => 'Jautājuma teksts nedrīkst pārsniegt 250 rakstzīmes.',
            'questions.*.options.required' => 'Katram jautājumam jābūt vismaz diviem variantiem.',
            'questions.*.options.min' => 'Katram jautājumam jābūt vismaz diviem variantiem.',
            'questions.*.options.*.required' => 'Atbildes varianta teksts nedrīkst būt tukšs.',
            'questions.*.options.*.max' => 'Atbildes variants nedrīkst pārsniegt 250 rakstzīmes.',
        ]);

        $poll = DB::transaction(function () use ($data, $request) {
            $poll = Poll::create([
                'user_id' => $request->user()->id,
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'status' => $data['status'],
                'is_anonymous' => $data['is_anonymous'] ?? false,
                'show_stats' => $data['show_stats'] ?? true,
                'allow_multiple_votes' => $data['allow_multiple_votes'] ?? false,
                'is_public' => $data['is_public'] ?? true,
                'requires_auth' => $data['requires_auth'] ?? false,
                'expires_at' => $data['expires_at'] ?? null,
                'categories' => $data['categories'] ?? null,
            ]);

            foreach ($data['questions'] as $order => $questionData) {
                $question = PollQuestion::create([
                    'poll_id' => $poll->id,
                    'text' => $questionData['text'],
                    'is_multiple_choice' => $questionData['is_multiple_choice'] ?? false,
                    'is_required' => $questionData['is_required'] ?? false,
                    'order' => $order,
                ]);

                foreach ($questionData['options'] as $optionOrder => $optionText) {
                    PollOption::create([
                        'question_id' => $question->id,
                        'text' => $optionText,
                        'order' => $optionOrder,
                    ]);
                }
            }

            return $poll->load('questions.options');
        });

        return response(['poll' => $poll], 201);
    }

    public function show(Request $request, Poll $poll)
    {
        if ($poll->user_id !== $request->user()->id) {
            return response(['message' => 'Piekļuve liegta.'], 403);
        }

        return response(['poll' => $poll->load(['questions' => function ($query) {
            $query->orderBy('order')->with(['options' => function ($q) {
                $q->orderBy('order')->withCount('responses as votes_count');
            }]);
        }])]);
    }

    public function update(Request $request, Poll $poll)
    {
        if ($poll->user_id !== $request->user()->id) {
            return response(['message' => 'Piekļuve liegta.'], 403);
        }

        $data = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:250',
            'status' => 'required|in:draft,active,closed,paused',
            'is_anonymous' => 'boolean',
            'show_stats' => 'boolean',
            'allow_multiple_votes' => 'boolean',
            'is_public' => 'boolean',
            'requires_auth' => 'boolean',
            'expires_at' => 'nullable|date',
            'categories' => 'nullable|array',
            'categories.*' => 'string|max:50',
            'questions' => 'required|array|min:1',
            'questions.*.text' => 'required|string|max:250',
            'questions.*.is_multiple_choice' => 'boolean',
            'questions.*.is_required' => 'boolean',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.options.*' => 'required|string|max:250',
        ], [
            'title.required' => 'Aptaujas nosaukums ir obligāts.',
            'title.max' => 'Aptaujas nosaukums nedrīkst pārsniegt 100 rakstzīmes.',
            'description.max' => 'Apraksts nedrīkst pārsniegt 250 rakstzīmes.',
            'status.required' => 'Aptaujas statuss ir obligāts.',
            'status.in' => 'Nederīgs aptaujas statuss.',
            'expires_at.date' => 'Lūdzu ievadiet derīgu datumu.',
            'questions.required' => 'Aptaujai jābūt vismaz vienam jautājumam.',
            'questions.min' => 'Aptaujai jābūt vismaz vienam jautājumam.',
            'questions.*.text.required' => 'Katram jautājumam jābūt tekstam.',
            'questions.*.text.max' => 'Jautājuma teksts nedrīkst pārsniegt 250 rakstzīmes.',
            'questions.*.options.required' => 'Katram jautājumam jābūt vismaz diviem variantiem.',
            'questions.*.options.min' => 'Katram jautājumam jābūt vismaz diviem variantiem.',
            'questions.*.options.*.required' => 'Atbildes varianta teksts nedrīkst būt tukšs.',
            'questions.*.options.*.max' => 'Atbildes variants nedrīkst pārsniegt 250 rakstzīmes.',
        ]);

        DB::transaction(function () use ($data, $poll) {
            $poll->update([
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'status' => $data['status'],
                'is_anonymous' => $data['is_anonymous'] ?? false,
                'show_stats' => $data['show_stats'] ?? true,
                'allow_multiple_votes' => $data['allow_multiple_votes'] ?? false,
                'is_public' => $data['is_public'] ?? true,
                'requires_auth' => $data['requires_auth'] ?? false,
                'expires_at' => $data['expires_at'] ?? null,
                'categories' => $data['categories'] ?? null,
            ]);

            $poll->questions()->each(fn($q) => $q->options()->delete());
            $poll->questions()->delete();

            foreach ($data['questions'] as $order => $questionData) {
                $question = PollQuestion::create([
                    'poll_id' => $poll->id,
                    'text' => $questionData['text'],
                    'is_multiple_choice' => $questionData['is_multiple_choice'] ?? false,
                    'is_required' => $questionData['is_required'] ?? false,
                    'order' => $order,
                ]);

                foreach ($questionData['options'] as $optionOrder => $optionText) {
                    PollOption::create([
                        'question_id' => $question->id,
                        'text' => $optionText,
                        'order' => $optionOrder,
                    ]);
                }
            }
        });

        return response(['poll' => $poll->load('questions.options'), 'message' => 'Aptauja atjaunota veiksmīgi!']);
    }

    public function close(Request $request, Poll $poll)
    {
        if ($poll->user_id !== $request->user()->id) {
            return response(['message' => 'Piekļuve liegta.'], 403);
        }

        $poll->update(['status' => 'closed']);

        return response(['poll' => $poll, 'message' => 'Aptauja slēgta veiksmīgi.']);
    }

    public function pause(Request $request, Poll $poll)
    {
        if ($poll->user_id !== $request->user()->id) {
            return response(['message' => 'Piekļuve liegta.'], 403);
        }

        $poll->update(['status' => 'paused']);

        return response(['poll' => $poll, 'message' => 'Aptauja apturēta.']);
    }

    public function open(Request $request, Poll $poll)
    {
        if ($poll->user_id !== $request->user()->id) {
            return response(['message' => 'Piekļuve liegta.'], 403);
        }

        $poll->update(['status' => 'active']);

        return response(['poll' => $poll, 'message' => 'Aptauja atvērta.']);
    }

    public function destroy(Request $request, Poll $poll)
    {
        if ($poll->user_id !== $request->user()->id) {
            return response(['message' => 'Piekļuve liegta.'], 403);
        }

        $poll->delete();

        return response(['message' => 'Aptauja dzēsta veiksmīgi.']);
    }
}
