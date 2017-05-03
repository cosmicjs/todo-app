const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
app.use(volleyball);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//serve up static files
app.use(express.static(path.resolve(__dirname, '..', 'client')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
// app.use(express.static(path.resolve(__dirname, '..', 'client', 'styles', 'mainSheet', 'main.css')));

// app.get('/client/styles/mainSheet', function (request, response){
//   console.log("I HIT DA STYLES");
//   response.sendFile(path.resolve(__dirname, '..', 'styles', 'mainSheet', 'main.css'))
// });
// app.use(express.static(path.resolve(__dirname, 'client', 'styles', 'mainSheet', 'main.css')));


app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


// handle every other route with index.html, which will contain
// a script tag to our application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
});

app.listen(PORT, function () {
  console.log("Rockin out on port " + PORT + " homie");
});