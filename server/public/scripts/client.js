$(document).ready(function() {
  console.log('jquery loaded');

  //running the first ajax request to display on DOM
  getFromServerToDom();

  $('#submit').on('click', function(){
    console.log('submit clicked');

    //creating the object to send to the server using the inputs
    var jokeObject = {};

    jokeObject.whoseJoke = $('#whoseJoke').val();
    jokeObject.jokeQuestion = $('#jokeQuestion').val();
    jokeObject.punchLine = $('#punchLine').val();

    //logging that object after is is created
    console.log(jokeObject);

    //running what will be the second ajax request on the page after click.
    $.ajax({
      type: 'POST',
      url: '/jokes',
      data: jokeObject,
      success: function(response){ //since this function is using response from server as a variable, I hope it is clear that the response came from the server. Look at the server side code (app.js) to see the SEPARATE logic.
        console.log('back from server with:', response);
        showServerDataOnDom(response);
      }//end success function in ajax
    });//end ajax
  });//end submit click function
});//end document ready

//function to get jokes from the server and display on DOM
function getFromServerToDom(){
  $.ajax({
    type: 'GET',
    url: '/jokes',
    success: function(response){ //since this function is using response from server as a variable, the response comes from the server. Look at the server side code (app.js) to see the SEPARATE logic.
      console.log('back from server with:', response);
      showServerDataOnDom(response);
    }//end success
  });//end ajax
}//end getFromServerToDom function

//function that acts on server data to append this information to DOM. It concatenates all the information first, then appends as a single block.
function showServerDataOnDom(response){
  $('#jokesContainer').empty();
  var whatGetsShown = '';
  for (var i = 0; i < response.length; i++) {
    whatGetsShown += '<p class = "name">From: ' + response[i].whoseJoke + '</p>' +
                     '<p class = "setUp">' + response[i].jokeQuestion + '</p>' +
                     '<p class = "punchLine">' + response[i].punchLine + '</p>';
  }
  $('#jokesContainer').append(whatGetsShown);
}//end showServerDataOnDom
