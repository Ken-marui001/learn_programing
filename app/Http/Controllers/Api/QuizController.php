<?php

namespace App\Http\Controllers\Api;

use App\Quiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuizController extends Controller
{
    public function index(){
        $quizzes = Quiz::all();
        return $quizzes;
    }
    public function store(Request $request){
        $quiz = new Quiz();
        $quiz->answer = $request->answer;
        $quiz->wrong1 = $request->wrong1;
        $quiz->wrong2 = $request->wrong2;
        $quiz->wrong3 = $request->wrong3;
        $quiz->text = $request->text;
        $quiz->code = $request->code;
        $quiz->save();

        return redirect('api/quizzes');
    }

    public function show($id){
        // 引数で受け取った$idを元にfindでレコードを取得
        $quiz = Quiz::find($id);
        return $quiz;
    }
}
