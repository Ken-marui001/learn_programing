$(function(){
  function buildhtml(quiz){
    let choices = [quiz.answer, quiz.wrong1, quiz.wrong2, quiz.wrong3];
    choices = arr_shuffle(choices);
    let html =`<article class="quiz" quiz-id="${quiz.id}">
      <div class="quiz__text">
        <pre><p>${quiz.text}</p></pre>
        <div class="codes"><pre><code>${quiz.code}</code></pre></div>
      </div>
      <section class="quiz__choice">
        <div class="choice">${choices[0]}</div>
        <div class="choice">${choices[1]}</div>
        <div class="choice">${choices[2]}</div>
        <div class="choice">${choices[3]}</div>
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
      // console.log('done')
      $('.quiz-board').empty();
      $('.quiz-board').append(buildhtml(data));
    }).fail(function(){
      console.log('fail')
    });
  }
  if(location.pathname.match(/^\/game$/)){
    let count = 0;
    let quizzes = arr_shuffle([...Array(num).keys()].map(i => ++i)).slice(0, 10);
    let timer = null;

    function countup(){
      count++;
      $('#timer').text((count/10).toFixed(1));
    }

    $('.start.btn').on('click', function(){
      $('.start-view').removeClass('show');
      call_quiz(quizzes.pop());
      timer = setInterval(countup, 100);
    })

    $('.quiz-board').on('click', '.choice', function(){
      const id = $(this).parents(".quiz").attr('quiz-id');
      const val = $(this).text();
      let url = "/api/quizzes/" + String(id) + "/check/" + String(val)
      $.ajax({
        //ルーティングで設定した通り/api/quizzesとなるよう文字列を書く
        url: url,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json'
      }).done(function(data){
        if(data==0){
          if(quizzes.length!=0){
            call_quiz(quizzes.pop());
          }else{
            clearInterval(timer);
			      timer = null;
            console.log('finish')
          }
        }else{
          count +=50;
        }
      }).fail(function(){
        console.log('fail')
      });
    })


  }
})