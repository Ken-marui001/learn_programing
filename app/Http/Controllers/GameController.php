<?php

namespace App\Http\Controllers;

use App\Quiz;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(){
        //ランダムな出題とするために現在のQuizテーブルのデータ数を渡し、出題番号の配列を作成する
        $num = Quiz::count();
        return view('games/index', ['num'=>$num]);
    }
}
