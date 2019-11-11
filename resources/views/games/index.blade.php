@extends('layouts/app')
@section('content')
<script>
    let num = @json($num);
</script>
<div id="timer"></div>
<div class="quiz-board">
  <div class="reaction">
    <img src="/storage/images/mark_maru.png">
    <p></p>
  </div>
  <div class="start-view show">
    <div class="start btn">
      START
    </div>
  </div>
</div>
@endsection