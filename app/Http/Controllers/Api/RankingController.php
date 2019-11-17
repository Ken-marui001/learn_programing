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
        $ranking_tops = Ranking::orderBy('time', 'asc')->take(20)->get();
        $this_rank = Ranking::select(DB::raw('count(*) + 1 as rank'))->where('time', '<', floatval($request->time)/10)->get();
        return [$ranking_tops, $this_rank];
    }
}
