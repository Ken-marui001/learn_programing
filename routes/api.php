<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['api']], function(){
    Route::resource('quizzes', 'Api\QuizController', ['except' => ['create', 'edit']]);
    Route::get('/quizzes/{id}/check/{val}', 'Api\QuizController@check')->name('quizzes.check');
    Route::get('/quizzes_count', 'Api\QuizController@count')->name('quizzes.count');
  });