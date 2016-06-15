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
  }, 50);
}
function endLoading(){
  COUNT = 31
  $('#loading-image').find("p").html(COUNT);
  setTimeout(function(){
    $('#loading').fadeOut(function(){
      COUNT = 1
      $('#loading-image').find("p").html(COUNT);
    });
  },300);
}

$(function(){
  $('#execute').click(
    function(){
      var data = {
        "age": $('#age').val(),
        "gender": $('#gender').val(),
        "height": $('#height').val(),
        "weight": $('#weight').val(),
        "meal_rate": $('#meal_rate').val(),
        "motion_rate": $('#motion_rate').val(),
        "crunch_rate": $('#crunch_rate').val()
      }
      $.ajax({
        type: 'POST',
        url: 'https://6q09kuhuic.execute-api.us-east-1.amazonaws.com/prod/predict',
        data: JSON.stringify(data),
        beforeSend: function(){
          callLoading();
        },
        success: function(data) {
          alert(data);
        },
        complete: function(){
          LOADING_FLAG = true
        }
      });
    }
  );
});
