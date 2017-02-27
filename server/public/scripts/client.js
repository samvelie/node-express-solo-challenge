$(document).ready(function() {
  console.log('jquery loaded');

  $('#submit').on('click', function(){
    console.log('submit clicked');
    var jokeObject = {};
    var whoseJoke = $('#whoseJoke').val();
    var jokeQuestion = $('#jokeQuestion').val();
    var punchLine = $('#punchLine').val();

    jokeObject.whoseJoke = whoseJoke;
    jokeObject.jokeQuestion = jokeQuestion;
    jokeObject.punchLine = punchLine;

    console.log(jokeObject);

    $.ajax({
      type: 'POST',
      url: '/jokes',
      data: jokeObject,
      success: function(response){
        console.log('back from server with:', response);
      }
    });
  });

});
