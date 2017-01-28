var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./route/index');
var tasks = require('./route/tasks');

var app = express();

var port = process.env.port || 8080;

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Create route
app.use('/', index);
app.use('/api', tasks);

app.listen(port, function()
{
    console.log('Listening on port: ' + port);
})