$(function(){
  $('#execute').click(
    function(){
      $.post(
        'https://oy76615zsh.execute-api.us-east-1.amazonaws.com/ml',
        {
          "age": $('#age').val(),
          "gender": $('#gender').val(),
          "height": $('#height').val(),
          "weight": $('#weight').val(),
          "meal_rate": $('#meal_rate').val(),
          "motion_rate": $('#motion_rate').val(),
          "crunch_rate": $('#crunch_rate').val()
        },
        function(data){
          alert(data);
        }
      );
    }
  );
});