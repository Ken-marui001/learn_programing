<?php

use Illuminate\Database\Seeder;

class QuizTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr = [4, 5, 6, 7];
        foreach ($arr as $val) {
            $ans = 0;
            $w1 = 0;
            $w2 = 0;
            $w3 = 0;
            $ans1 = 0;
            $w11 = 0;
            $w12 = 0;
            $w13 = 0;
            $count = 0;
            for($i=0; $i<=$val+1; $i++){
                $count += $i;
                if($i == $val-2){
                    $w1 = $count;
                    $w11 = $count;
                }else if($i == $val-1){
                    $ans = $count;
                    $w12 = $count;
                }else if($i == $val){
                    $w2 = $count;
                    $ans1= $count;
                }else if($i ==$val+1){
                    $w3 = $count;
                    $w13 = $count;
                }
            }
            DB::table('quizzes')->insert([
                'answer' => strval($ans),
                'wrong1' => strval($w1),
                'wrong2' => strval($w2),
                'wrong3' => strval($w3),
                'text' => '以下のコードの出力結果として正しいものを選択せよ',
                'code' => 
                "count=0\n$val.times do |time|\n  count+=time\nend\nputs count",
            ]);
            DB::table('quizzes')->insert([
                'answer' => strval($ans1),
                'wrong1' => strval($w11),
                'wrong2' => strval($w12),
                'wrong3' => strval($w13),
                'text' => '以下のコードの出力結果として正しいものを選択せよ',
                'code' => 
                "count=0\ni = 0\nwhile i <= $val do\n  count += i\n  i += 1\nend\nputs count",
            ]);
            DB::table('quizzes')->insert([
                'answer' => strval($ans),
                'wrong1' => strval($w1),
                'wrong2' => strval($w2),
                'wrong3' => strval($w3),
                'text' => '以下のコードの出力結果として正しいものを選択せよ',
                'code' => 
                "count=0\ni = 0\nwhile i < $val do\n  count += i\n  i += 1\nend\nputs count",
            ]);
        }
        

    }
}
