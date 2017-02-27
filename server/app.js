var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 3000;


// initial jokes provided by the client
//
var jokes = [
  {
    whoseJoke: "Luke",
    jokeQuestion: "Friends are like snow flakes...",
    punchLine: "If you pee on them they disappear."
  },
  {
    whoseJoke: "Kris",
    jokeQuestion: "How many software engineers does it take to change a lightbulb?",
    punchLine: "None! That's a hardware problem!"
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "Went to the zoo the other day. It only had one dog in it.",
    punchLine: "It was shih tzu."
  }
];

// static file requests
app.use(express.static('server/public'));
app.use( bodyParser.urlencoded({extended: true}));

// routes

// this route is used when jQuery loads to show the current joke list
app.get('/jokes', function(req,res){
  console.log('getting jokes now');
  res.send(jokes);
})

// this route is used when user adds a new joke. It contains the logic that adds that joke information to the jokes array, then returns the updated array
app.post('/jokes', function(req, res){
  console.log('in jokes with', req.body);
  jokes.push(req.body);
  res.send(jokes);
})

// Send index.html file
app.get('/', function(req, res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
});

// Start the server!
app.listen(port, function() {
  console.log("Node listening on port " + port);
});
