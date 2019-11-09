$(function(){
  function buildhtml(quiz, current_num){
    let choices = [quiz.answer, quiz.wrong1, quiz.wrong2, quiz.wrong3];
    choices = arr_shuffle(choices);
    let html =`<article class="quiz" quiz-id="${quiz.id}">
      <div class="quiz__counter">${current_num}/10</div>
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

  function call_quiz(id, current_num){
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
      $('.quiz-board').append(buildhtml(data, current_num));
    }).fail(function(){
      console.log('fail')
    });
  }

  function add_ranking(score, name=null){
    //非同期通信でのCSRF
    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      //ルーティングで設定した通り/api/quizzesとなるよう文字列を書く
      url: '/api/ranking',
      type: 'post',
      data: {name: name, time: score},
      dataType: 'json'
    }).done(function(data){
      console.log(data)
    }).fail(function(){
      console.log('fail')
    });
  }

  //GameController@indexが呼ばれた時の処理
  if(location.pathname.match(/^\/$/)){
    let count = 0;
    let timer = null;
    let quizzes = arr_shuffle([...Array(num).keys()].map(i => ++i)).slice(0, 10);
    let wrong_count = 0;
    let current_num = 1;

    function countup(){
      count++;
      $('#timer').text(String((count/10).toFixed(1))+"s");
    }

    $('.start.btn').on('click', function(){
      $('.start-view').removeClass('show');
      call_quiz(quizzes.pop(), current_num);
      timer = setInterval(countup, 100);
    })

    $('.quiz-board').on('click', '.choice', function(){
      const id = $(this).parents(".quiz").attr('quiz-id');
      const val = $(this).text();
      let url = "/api/quizzes/" + String(id) + "/check/" + String(val)
      
      $.ajax({
        //ルーティングで設定した通り/api/quizzes/{id}/check/{val}となるよう文字列を書く
        url: url,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json'
      }).done(function(data){
        //問題番号と回答を送る事で、正解なら"0"を、不正解なら"-1"を返す
        if(data==0){
          wrong_count=0;
          current_num++;
          if(quizzes.length!=0){
            //問題に正解しているかつ、問題が残っている
            call_quiz(quizzes.pop(), current_num);
          }else{
            //最後の問題に正解した時
            clearInterval(timer);
            timer = null;

            add_ranking(count, user_name);
          }
        }else{
          //連続で間違えると指数関数でペナルティが増える
          count +=　50*(10**wrong_count);
          wrong_count++;
        }
      }).fail(function(){
        console.log('fail')
      });
    })


  }
})