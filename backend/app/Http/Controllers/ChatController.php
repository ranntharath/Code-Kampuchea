<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        try {
            $request->validate([
                "message" => "required|string"
            ]);

            $userMessage = $request->message;

            // API key from .env
            $apiKey = env('GEMINI_API_KEY');

            if (!$apiKey) {
                throw new \Exception('GEMINI_API_KEY not set in .env');
            }

            $response = Http::withOptions(['verify' => false]) // only for local dev; remove/fix in prod!
                ->withHeaders([
                    'Content-Type' => 'application/json',
                ])
                ->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}",
                    [
                        "contents" => [
                            [
                                "role"    => "user",
                                "parts"   => [
                                    ["text" => $userMessage]
                                ]
                            ]
                        ],
                        // Optional: add generation config if needed
                        "generationConfig" => [
                            "temperature"     => 0.7,
                            "candidateCount"  => 1,
                            // "maxOutputTokens" => 2048,  // optional
                        ],
                        // Optional: safety settings to avoid blocks
                        "safetySettings" => [
                            [
                                "category"  => "HARM_CATEGORY_HARASSMENT",
                                "threshold" => "BLOCK_MEDIUM_AND_ABOVE"
                            ],
                            // add other categories as needed
                        ]
                    ]
                );

            if ($response->failed()) {
                throw new \Exception('Gemini API error: ' . $response->body());
            }

            $data = $response->json();

            // Extract the reply text
            $reply = $data['candidates'][0]['content']['parts'][0]['text']
                ?? "Sorry, I couldn't generate a reply.";

            return response()->json([
                'success' => true,
                'reply'   => $reply
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "error"   => $th->getMessage()
            ], 500);
        }
    }
}