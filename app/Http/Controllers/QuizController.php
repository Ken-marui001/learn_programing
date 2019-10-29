<?php

namespace App\Http\Controllers;

use App\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function new(){
        return view('quizzes/new');
    }
    public function create(Request $request){
        $quiz = new Quiz();
        $quiz->answer = $request->answer;
        $quiz->text = $request->text;
        $quiz->save();

        return redirect()->route('quizzes.new');
    }
}
