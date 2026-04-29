<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'username' => 'required|string|min:3|unique:users|max:50',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ], [
            'username.required' => 'Lietotājvārds ir obligāts.',
            'username.min' => 'Lietotājvārdam jābūt vismaz 3 rakstzīmēm.',
            'username.unique' => 'Šis lietotājvārds jau ir aizņemts.',
            'username.max' => 'Lietotājvārds nedrīkst pārsniegt 50 rakstzīmes.',

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

        $user->tokens()->delete();
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

    public function updateProfile(Request $request) {
        $user = $request->user();

        $data = $request->validate([
            'username' => 'required|string|max:50|unique:users,username,' . $user->id,
            'bio' => 'nullable|string|max:250',
        ], [
            'username.required' => 'Lietotājvārds ir obligāts.',
            'username.unique' => 'Šis lietotājvārds jau ir aizņemts.',
            'bio.max' => 'Bio nedrīkst pārsniegt 250 rakstzīmes.',
        ]);

        $user->update([
            'username' => $data['username'],
            'bio' => $data['bio'],
        ]);

        return response([
            'user' => $user,
            'message' => 'Profils atjaunots veiksmīgi!'
        ], 200);
    }

    public function updatePassword(Request $request) {
        $user = $request->user();

        $data = $request->validate([
            'current_password' => 'required|current_password',
            'new_password' => 'required|string|min:8|confirmed',
        ], [
            'current_password.required' => 'Parole ir obligāta.',
            'current_password.current_password' => 'Parole ir nepareiza.',
            'new_password.required' => 'Jaunā parole ir obligāta.',
            'new_password.min' => 'Jaunajai parolei jābūt vismaz 8 rakstzīmes garai.',
            'new_password.confirmed' => 'Paroles apstiprinājums nesakrīt.',
        ]);

        $user->update([
            'password' => Hash::make($data['new_password']),
        ]);

        return response(['message' => 'Parole veiksmīgi nomainīta!'], 200);
    }

    public function deleteAccount(Request $request) {
        $user = $request->user();

        $user->tokens()->delete();
        $user->delete();

        return response(['message' => 'Konts ir dzēsts.'], 200);
    }
}
