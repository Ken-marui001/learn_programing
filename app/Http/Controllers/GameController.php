<?php

namespace App\Http\Controllers;

use App\Quiz;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(){
        $num = Quiz::count();
        return view('games/index', ['num'=>$num]);
    }
}
