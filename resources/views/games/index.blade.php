@extends('layouts/app')
@section('content')
<script>
    let num = @json($num);
</script>
<div id="timer"></div>
<div class="quiz-board">
  <div class="result">
    <p>あなたの記録は1.0秒です</p>
    <p>順位は<span>12位</span>です。</p>
  </div>
  <div class="start-view show">
    <div class="start btn">
      START
    </div>
  </div>
</div>
@endsection