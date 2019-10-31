@extends('layouts/app')
@section('content')
<div class="list-group">
  @foreach($quizs as $quiz)
  <P>{{$quiz->answer}}</P>
  <P>{{$quiz->wrong1}}</P>
  <P>{{$quiz->wrong2}}</P>
  <P>{{$quiz->wrong3}}</P>
  <pre>{{$quiz->text}}</pre>
  <pre><code>{{$quiz->code}}</code></pre>
  @endforeach
</div>
@endsection