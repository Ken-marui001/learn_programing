<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//User Management
Auth::routes();

Route::get('/', 'GameController@index')->name('game');
Route::group(['middleware' => ['role:superAdmin']], function () {
    Route::resource('quizzes', 'QuizController');
});