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
      }).done(function(data) {
          result = data.Prediction.predictedValue.toFixed(1)
          if(result <= -1.0) {
            neko_size = 's'
          } else if(result <= -0.5) {
            neko_size = 'm'
          } else if(result <= -0.1) {
            neko_size = 'l'
          } else {
            neko_size = ''
          }
          $('#neko').addClass('shake-little shake-constant')
          $('#neko').removeClass('s m l').addClass(neko_size)
          setTimeout(function(){
            $('#neko').removeClass('shake-little shake-constant')
            setTimeout(function(){
              $('#result').text(result * 2 + 'kg');
            },1000);
          },6000);
      }).fail(function(data) {
          alert('error');
      })
    }
  );
});