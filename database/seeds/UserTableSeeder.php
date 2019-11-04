<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => str_random(10),
            'email' => 'aaa@gmail.com',
            'password' => bcrypt('1qaz2wsx'),
        ]);
        $user->assignRole('superAdmin');
    }
}
