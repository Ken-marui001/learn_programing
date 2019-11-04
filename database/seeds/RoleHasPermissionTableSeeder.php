<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleHasPermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            'make quiz',  // クイズの作成ができる
            'read quiz', // クイズ一覧を閲覧できる
            'edit quiz',  // クイズの編集ができる
            'delete quiz', // クイズの削除ができる
        ];
        $role = Role::findByName('superAdmin');
        $role->givePermissionTo($permissions);
    }
}
