$(function(){
  function buildQuizHtml(quiz, current_num){
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

  function buildRankingHtml(data, score){
    let ranking_html ="";
    let rank = "";
    let html ="";

    data[0].forEach(function(record, i){
      let change_color = "";
      console.log(record)
      if (data[1] === i+1) {
        change_color = 'class="rankIn"';
      }

      ranking_html += `<li ${change_color}>
                <div class="rankings__num">
                  第<span>${i+1}</span>位
                </div>
                <div class="rankings__time">
                  ${parseFloat(record.time).toFixed(1)}秒
                </div>
                <div class="rankings__name">
                  ${record.name}
                </div>
              </li>`;
    });

    if(data[1]>100){
      rank = "ランク外です。100位目指して頑張りましょう!!";
    }else if(data[1]>20){
      rank = `<span>${data[1]}位</span>です。入賞を目指しましょう!!`;
    }else{
      rank = `<span>${data[1]}位</span>です。入賞おめでとうございます!!`;
    }
    html=`<div class="result">
            <div class="your-record">
              <p>あなたの記録は${String((score/10).toFixed(1))}秒です</p>
              <p>順位は${rank}</p>
            </div>
            <ul class="rankings">
              ${ranking_html}
            </ul>
          </div>`;
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
      $('.quiz-board').append(buildQuizHtml(data, current_num));
    }).fail(function(){
      console.log('fail')
    });
  }

  function reaction(action){
    let comment = action==="maru" ? "正　解" : "不正解..."
    let html=`<div class="reaction-box">
      <div class="reaction">
        <img src="https://ken-marui001.s3.ap-northeast-1.amazonaws.com/Heroku/learn_programing/marks/mark_${action}.png" width="100" height="100">
        <p class="${action}">${comment}</p>
      </div>
    </div>`;

    $('.quiz-board').prepend(html);
    $(".reaction-box").delay(200).fadeOut("slow").delay(100);
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
      $('.quiz-board').empty();
      $('.quiz-board').append(buildRankingHtml(data, score));
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
      //ルーティングで設定した通り/api/quizzes/{id}/check/{val}となるよう文字列
      let url = "/api/quizzes/" + String(id) + "/check/" + String(val)
      
      //問題番号と回答を送る事で、正解なら"0"を、不正解なら"-1"を返す
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json'
      }).done(function(data){
        if(data==0){
          wrong_count=0;
          current_num++;
          reaction("maru");
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
          reaction("batsu");
          count +=　50*(10**wrong_count);
          wrong_count++;
        }
      }).fail(function(){
        console.log('fail')
      });
    })


  }
})