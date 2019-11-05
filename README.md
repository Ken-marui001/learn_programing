Programing_Quiz
 
Programing_QUiz is a learning page about programing with quiz. You can challenge quizzes about programing. And then you compete for the fastest time finish it. I expect competition contribute to learning motivation. 
 
# DEMO
 
You challenge quizzes with 4 choices. if you choose correct answer, you can challenge next quiz. but if you choose wrong answer, your score increase time by 5 seconds
 
# Features
 
Programing_Quiz can compete for time finish quizzes.
 
# Requirement
 
* Laravel Homestead Vagrant Box
* Virtual Box
* php: 7.2
* laravel/framework: 6.2
* spatie/laravel-permission: 3.2
 
# Installation

Please Read Homestead reference([LINK](https://readouble.com/laravel/6.0/ja/homestead.html)) to install and setup.

Create new Laravel project:
```bash
composer create-project laravel/laravel Programing Quiz --prefer-dist
```

Install [Laravel-permission](https://github.com/spatie/laravel-permission) with a composer command.
```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider" --tag="migrations"
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider" --tag="config"
```
 
# Usage
 
```bash
$ git clone https://github.com/Ken-marui001/learn_programing.git
$ cd learn_programing
$ composer update
$ composer install
```

then you rename ".env.example" to ".env".
```bash
$ php artisan key:generate
$ php artisan migrate
$ php artisan db:seed
```

 
# Note
 
I don't test environments under Linux and Windows.
 
# Author
 
* Ken-marui
* 
 
# License
 
"Laravel" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
 
Enjoy quizzes to fastest!

Thank you!