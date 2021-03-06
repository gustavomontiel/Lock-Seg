<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        $role = Role::create(['name' => 'administrador']);
        $role = Role::create(['name' => 'administrativo']);
        $role = Role::create(['name' => 'baja']);
        $role = Role::create(['name' => 'guardia']);
        $role = Role::create(['name' => 'cliente']);

    }
}
