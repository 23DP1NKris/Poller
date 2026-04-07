<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'username' => 'required|string|unique:users|max:50',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ], [
            'username.required' => 'Lietotājvārds ir obligāts.',
            'username.unique' => 'Šis lietotājvārds jau ir aizņemts.',
            'username.max' => 'Lietotājvārds nedrīkst pārsniegt 50 zīmes.',

            'email.required' => 'E-pasta adrese ir obligāta.',
            'email.email' => 'Lūdzu ievadiet derīgu e-pasta adresi.',
            'email.unique' => 'Šis e-pasts jau ir reģistrēts.',

            'password.required' => 'Parole ir obligāta.',
            'password.min' => 'Parolei jābūt vismaz 8 zīmes garai.',
        ]);


        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'user',
            'bio' => null,
        ]);

        $token = $user->createToken('poller-token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ],[
            'email.required' => 'E-pasta adrese ir obligāta.',
            'email.email' => 'Lūdzu ievadiet derīgu e-pasta adresi.',
            'password.required' => 'Parole ir obligāta.',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response([
                'errors' => [
                    'email' => ['Nepareizs e-pasts vai parole']
                ]
            ], 401);
        }

        $token = $user->createToken('poller-token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'Izrakstīšanās ir veiksmīga'
        ], 200);
    }
}
