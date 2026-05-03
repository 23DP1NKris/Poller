<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        return response([
            'total_users'     => User::count(),
            'total_polls'     => Poll::count(),
            'total_responses' => \App\Models\PollResponse::count(),
            'active_polls'    => Poll::where('status', 'active')->count(),
        ]);
    }

    public function users(Request $request)
    {
        $q = $request->query('search', '');

        return User::withCount('polls')
            ->when($q, fn($query) => $query->where('username', 'like', "%{$q}%")
                ->orWhere('email', 'like', "%{$q}%"))
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($u) => [
                'id'         => $u->id,
                'username'   => $u->username,
                'email'      => $u->email,
                'role'       => $u->role,
                'polls'      => $u->polls_count,
                'joined'     => $u->created_at->toDateString(),
            ]);
    }

    public function polls(Request $request)
    {
        $q = $request->query('search', '');

        return Poll::with('user:id,username')
            ->withCount('responses')
            ->when($q, fn($query) => $query->where('title', 'like', "%{$q}%")
                ->orWhereHas('user', fn($uq) => $uq->where('username', 'like', "%{$q}%")))
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($p) => [
                'id'        => $p->id,
                'title'     => $p->title,
                'author'    => $p->user->username ?? '—',
                'responses' => $p->responses_count,
                'status'    => $p->status,
            ]);
    }

    public function destroyUser(User $user)
    {
        $user->delete();
        return response(null, 204);
    }

    public function destroyPoll(Poll $poll)
    {
        $poll->delete();
        return response(null, 204);
    }
}
