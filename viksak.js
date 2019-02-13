//including express
var express = require('express');
var app = express();

//Middleware
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4444);
app.use(express.static(__dirname));


app.get('/fname-view', function (req, res) {
    udb.view('userViews', 'fName-view', { include_docs: false, key: req.query.name }, function (err, data) {
        if (!err) {
            console.log(data); res.send(data.rows[0].value)
        }
    })
console.log(__dirname);
});

//routing function and error handling 
function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Tye': 'text/plain' });
            res.end('500 - Internal Error');
        }
        else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}



//Routes
//login
app.get('/', function (req, res) {
    serveStaticFile(res, '/home.html', 'html', 200);
});

// custom 404 page
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

//hosting the server and listing to the defined port
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
