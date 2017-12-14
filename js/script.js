// Loading
var COUNT = 1
var LOADING_FLAG = false
function callLoading(){
  $('#loading').fadeIn(function(){
    $('#loading-image').addClass("rotateAnim");
    countDate();
  });
}
function countDate(){
  var interval = setInterval(function(){
    if(COUNT < 30){
      COUNT++
      $('#loading-image').find("p").html(COUNT);
    }else{
      if(LOADING_FLAG == true){
        LOADING_FLAG = false
        endLoading();
        clearInterval(interval);
      }
    }
  }, 160);
}
function endLoading(){
  COUNT = 31
  $('#loading-image').find("p").html(COUNT);
  setTimeout(function(){
    $('#loading').fadeOut(function(){
      COUNT = 1
      $('#loading-image').find("p").html(COUNT);
    });
  },1000);
}

$(function(){
  $('#execute').click(
    function(){
      if($('#error').css("display")=="block"){
        $('#error').fadeOut();
      }
      age = $('#age').val();
      gender = $('#gender').val();
      height = $('#height').val();
      weight = $('#weight').val();
      meal_rate = $('#meal_rate').val();
      motion_rate = $('#motion_rate').val();
      crunch_rate = $('#crunch_rate').val();
      $('#error').text("");
      if(age == '' || gender == '' || height == '' || weight == '' || meal_rate == '' || motion_rate == '' || crunch_rate == '') {
        $('#error').text("ぜんぶにゅうりょくしてね");
        $('#error').fadeIn();
        return;
      }
      $('#result').addClass('none');
      $('#neko').removeClass('s m l');

      var data = {
        "age": age,
        "gender": gender,
        "height": height,
        "weight": weight,
        "meal_rate": meal_rate,
        "motion_rate": motion_rate,
        "crunch_rate": crunch_rate
      }

      $.ajax({
        type: 'POST',
        url: 'https://6q09kuhuic.execute-api.us-east-1.amazonaws.com/prod/predict',
        data: JSON.stringify(data),
        beforeSend: function(){
          callLoading();
        },
        complete: function(){
          LOADING_FLAG = true
        }
      }).done(function(result) {
          if(result <= -4.0) {
            neko_size = 's'
          } else if(result <= -2.0) {
            neko_size = 'm'
          } else if(result <= -1.0) {
            neko_size = 'l'
          } else {
            neko_size = ''
          }
          $('#neko').addClass('shake-little shake-constant')
          $('#neko').addClass(neko_size)
          setTimeout(function(){
            $('#neko').removeClass('shake-little shake-constant')
            setTimeout(function(){
              $('#result span').text(result + ' kg');
              $('#result').removeClass('none');
            },1000);
          },6000);
      }).fail(function(data) {
          alert('error');
      })
    });
});
