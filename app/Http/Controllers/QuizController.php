<?php

namespace App\Http\Controllers;

use App\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index(){
        $quizzes = Quiz::all();
        return view('quizzes/index', ['quizs' => $quizzes,]);
    }
    public function new(){
        return view('quizzes/new');
    }
    public function create(Request $request){
        $quiz = new Quiz();
        $quiz->answer = $request->answer;
        $quiz->wrong1 = $request->wrong1;
        $quiz->wrong2 = $request->wrong2;
        $quiz->wrong3 = $request->wrong3;
        $quiz->text = $request->text;
        $quiz->code = $request->code;
        $quiz->save();

        return redirect()->route('quizzes.new');
    }
}
