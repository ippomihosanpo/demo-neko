$(function(){
  $('#execute').click(
    function(){
      $.ajax({
        url: 'https://oy76615zsh.execute-api.us-east-1.amazonaws.com/ml',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
          'x-api-key': 'DGswIXFuXq4pTlxhCjlgf9U2dvJrJThJ2oZi4ppY'
        },
        data: {
          "age": $('#age').val(),
          "gender": $('#gender').val(),
          "height": $('#height').val(),
          "weight": $('#weight').val(),
          "meal_rate": $('#meal_rate').val(),
          "motion_rate": $('#motion_rate').val(),
          "crunch_rate": $('#crunch_rate').val()
        }
      }).done(function(data) {
          alert(data);
      }).fail(function(data) {
        console.log(data.responseJSON);
      });
    }
  );
});