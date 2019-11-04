@extends('layouts/app')
@section('content')
<div class="form">
  <form action="/quizzes/{{$quiz->id}}" method="POST">
    @csrf
    <div class="field">
      <div class="field-label">
        <label for="name">答え:</label>
      </div>
      <div class="field-input">
        <input type="text" name="answer" placeholder="例：10" value="{{$quiz->answer}}"/>
      </div>
    </div>
    <div class="field">
      <div class="field-label">
        <label for="name">選択肢1:</label>
      </div>
      <div class="field-input">
        <input type="text" name="wrong1" placeholder="例：15"  value="{{$quiz->wrong1}}"/>
      </div>
    </div>
    <div class="field">
      <div class="field-label">
        <label for="name">選択肢2:</label>
      </div>
      <div class="field-input">
        <input type="text" name="wrong2" placeholder="例：6" value="{{$quiz->wrong2}}"/>
      </div>
    </div>
    <div class="field">
      <div class="field-label">
        <label for="name">選択肢3:</label>
      </div>
      <div class="field-input">
      <input type="text" name="wrong3" placeholder="例：3" value="{{$quiz->wrong3}}"/>
      </div>
    </div>
    <div class="field-area">
      <div class="field-label">
          <label for="text">問題:</label>
        </div>
        <div class="field-input">
          <textarea rows="10" cols="60" name="text">{{$quiz->text}}</textarea>
        </div>
    </div>
    <div class="field-area">
      <div class="field-label">
          <label for="code">プログラミングコード:</label>
        </div>
        <div class="field-input">
        <textarea rows="10" cols="60" name="code">{{$quiz->code}}</textarea>
        </div>
    </div>
    <div class="field">
      {{-- patchを使う場合は必須 --}}
      <input type="hidden" name="_method" value="patch">
      <input type="submit" value="更新"/>
    </div>
  </form>
  </div>    
@endsection