@extends('layouts/app')
@section('content')
<div class="form">
  <form action="{{route('quizzes')}}" method="POST">
    @csrf
    <div class="field">
      <div class="field-label">
        <label for="name">答え:</label>
      </div>
      <div class="field-input">
        <input type="text" name="answer" placeholder="答えを入力してください"/>
      </div>
    </div>
    <div class="field-area">
      <div class="field-label">
          <label for="explain">問題:</label>
        </div>
        <div class="field-input">
          <textarea rows="10" cols="60" name="text"></textarea>
        </div>
    </div>
    <div class="field">
      <input type="submit" value="追加"/>
    </div>
  </form>
  </div>    
@endsection