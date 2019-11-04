<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            'superAdmin',   // 最高責任者
        ];
        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }
    }
}
