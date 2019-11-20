@extends('layouts/app')
@section('content')
<script>
    let num = @json($num);
</script>
<div class="game">
  {{-- <div id="timer"></div> --}}
  <div class="quiz-board">
    {{-- <div class="start-view show">
      <div class="start btn">
        START
      </div>
    </div> --}}
  </div>
</div>
@endsection