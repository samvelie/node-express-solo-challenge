$(document).ready(function() {
  console.log('jquery loaded');
  getFromServerToDom();

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
        $('#jokesContainer').empty(); //will clear what is already on page

        for (var i = 0; i < response.length; i++) {
          var whatGetsShown = '<p class = "name" >Name: ' + response[i].whoseJoke + '</p>' +
                              '<p class = "setUp" >' + response[i].jokeQuestion + '</p>' +
                              '<p class = "punchLine" >' + response[i].punchLine + '</p>';

          $('#jokesContainer').append(whatGetsShown);
        }

      }//end success function in ajax
    });//end ajax
  });//end submit click function

  //function to get jokes from the server and display on DOM
  function getFromServerToDom(){
    $.ajax({
      type: 'GET',
      url: '/jokes',
      success: function(response){
        for (var i = 0; i < response.length; i++) {
          var whatGetsShown = '<p class = "name">From: ' + response[i].whoseJoke + '</p>' +
                              '<p class = "setUp">' + response[i].jokeQuestion + '</p>' +
                              '<p class = "punchLine">' + response[i].punchLine + '</p>';

          $('#jokesContainer').append(whatGetsShown);
        }//end for loop
      }//end success
    });//end ajax
  }//end getFromServerToDom function
});//end document ready
