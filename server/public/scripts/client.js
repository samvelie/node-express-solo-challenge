//Everything going in document ready

$(document).ready(function() {
  console.log('jquery loaded');

  //running the first ajax request to display on DOM
  getFromServerToDom();

  $('#submit').on('click', function(){
    console.log('submit clicked');

    //creating the object to send to the server using the inputs
    var jokeObject = {};
    var whoseJoke = $('#whoseJoke').val();
    var jokeQuestion = $('#jokeQuestion').val();
    var punchLine = $('#punchLine').val();

    jokeObject.whoseJoke = whoseJoke;
    jokeObject.jokeQuestion = jokeQuestion;
    jokeObject.punchLine = punchLine;

    //logging that object after is is created
    console.log(jokeObject);

    //running what will be the second ajax request on the page after click. Question: should I put the get request function inside the success here?
    $.ajax({
      type: 'POST',
      url: '/jokes',
      data: jokeObject,
      success: function(response){ //since this function is using response from server as a variable, I hope it is clear that the response came from the server. Look at the server side code (app.js) to see the SEPARATE logic.
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
      success: function(response){ //since this function is using response from server as a variable, I hope it is clear that the response came from the server. Look at the server side code (app.js) to see the SEPARATE logic.
        console.log('back from server with:', response);
        
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
