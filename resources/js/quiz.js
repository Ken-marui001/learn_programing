$(function(){
  function buildhtml(quiz){
    let choices = [quiz.answer, quiz.wrong1, quiz.wrong2, quiz.wrong3];
    choices = arr_shuffle(choices);
    let html =`<article class="quiz">
      <div class="quiz-text">
        <pre>${quiz.text}</pre>
        <pre><code>${quiz.code}</code></pre>
      </div>
      <section class="quiz-choice">
        <p>${choices[0]}</p>
        <p>${choices[1]}</p>
        <p>${choices[2]}</p>
        <p>${choices[3]}</p>
      </section>
    </article>`;

    return html;
  }
  function arr_shuffle(array){
    for(var i = array.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  }
  function call_quiz(id){
    let url = "/api/quizzes/" + String(id);
    $.ajax({
      //ルーティングで設定した通り/api/quizzesとなるよう文字列を書く
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json'
    }).done(function(data){
      console.log('done')
      $('.quiz-board').empty();
      $('.quiz-board').append(buildhtml(data));
    }).fail(function(){
      console.log('fail')
    });
  }
  if(location.pathname.match(/^\/game$/)){
    let count = 0;
    let quizzes = [1, 2, 3];
    let timer = null;
    function countup(){
      count++;
      $('#timer').text(count);
    }
    $('.start.btn').on('click', function(){
      $('.start-view').removeClass('show');
      call_quiz(quizzes.pop());
      timer = setInterval(countup, 100);
    })
    
  }
})