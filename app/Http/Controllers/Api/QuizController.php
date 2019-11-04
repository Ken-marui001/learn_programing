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

    public function show($id){
        // 引数で受け取った$idを元にfindでレコードを取得
        $quiz = Quiz::find($id);
        return $quiz;
    }

    public function check($id, $val){
        /*
            $idはQuizテーブルのidを表す。
            $valは回答者の選択した答えを表す。
            クイズの答えと回答者の選択した答えが等しければ0を返し、間違っている場合は-1を返す。
        */
        
        // 引数で受け取った$idを元にfindでレコードを取得
        $quiz = Quiz::find($id);
        if(strcmp($quiz->answer, $val)==0){
            return 0;
        }else{
            return -1;
        }
    }

    public function count(){
        $num = Quiz::count();
        return $num;
    }
}
