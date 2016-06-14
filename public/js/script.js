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
        success: function(data) {
          alert(data);
        }
      });
    }
  );
});