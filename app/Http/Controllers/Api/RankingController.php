<?php

namespace App\Http\Controllers\Api;

use App\Ranking;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RankingController extends Controller
{
    public function store(Request $request){
        $ranking = new Ranking();
        if($request->name === null){
            $num = strval(Ranking::count()+1);
            $ranking->name = 'Guest'.$num;
        }else{
            $ranking->name = $request->name;
        }
        $ranking->time = floatval($request->time)/10;
        $ranking->save();

        //上位20名を表示させるためのレコード
        $ranking_tops = Ranking::orderBy('time', 'asc')->take(20)->get();
        //今回の特典から導かれる順位、ただし101位以下の場合には数えるのをやめる事で計算時間の上限を設定しておく
        $this_rank = Ranking::select(DB::raw('1'))->where('time', '<', floatval($request->time)/10)->limit(100)->get();
        return [$ranking_tops, $this_rank->count()+1];
    }
}
