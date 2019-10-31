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
        DB::table('quizzes')->insert([
            'answer' => '15',
            'wrong1' => '10',
            'wrong2' => '6',
            'wrong3' => '3',
            'text' => '以下のコードの出力結果として正しいものを選択せよ',
            'code' => 
            "count=0\ni = 0\nwhile i <= 5 do\n  count += i\n  i += 1\nend\nputs count",
        ]);
        DB::table('quizzes')->insert([
            'answer' => '10',
            'wrong1' => '15',
            'wrong2' => '6',
            'wrong3' => '3',
            'text' => '以下のコードの出力結果として正しいものを選択せよ',
            'code' => 
            "count=0\n5.times do |time|\n  count+=time\nend\nputs count",
        ]);
    }
}
