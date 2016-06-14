$(function(){
  $('#execute').click(
    function(){
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
      }).done(function(data) {
          result = data.Prediction.predictedValue.toFixed(1) * 4
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
    }
  );
});