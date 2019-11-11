@extends('layouts/app')
@section('content')
<script>
    let num = @json($num);
</script>
<div id="timer"></div>
<div class="quiz-board">
  <div class="reaction">
  <img src={{Storage::disk('s3')->url('Heroku/learn_programing/marks/mark_batsu.png')}}>
    <p></p>
  </div>
  <div class="start-view show">
    <div class="start btn">
      START
    </div>
  </div>
</div>
@endsection