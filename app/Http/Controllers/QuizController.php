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
    public function create(){
        return view('quizzes/create');
    }
    public function store(Request $request){
        $quiz = new Quiz();
        $quiz->answer = rtrim($request->answer);
        $quiz->wrong1 = $request->wrong1;
        $quiz->wrong2 = $request->wrong2;
        $quiz->wrong3 = $request->wrong3;
        $quiz->text = $request->text;
        $quiz->code = $request->code;
        $quiz->save();

        return redirect()->route('quizzes.index');
    }
    public function edit($id){
        $quiz = Quiz::find($id);
        return view('quizzes/edit', ['quiz' => $quiz,]);
    }
    public function update(Request $request, $id){
        // idを元にレコードを検索して$quizに代入
        $quiz = Quiz::find($id);
        // editで編集されたデータを$quizにそれぞれ代入する
        $quiz->answer = rtrim($request->answer);
        $quiz->wrong1 = $request->wrong1;
        $quiz->wrong2 = $request->wrong2;
        $quiz->wrong3 = $request->wrong3;
        $quiz->text = $request->text;
        $quiz->code = $request->code;
        // 保存
        $quiz->save();
        // indexへリダイレクト
        return redirect()->route('quizzes.index');
    }
}
