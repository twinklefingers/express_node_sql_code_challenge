var express = require('express'); //thrid party, require by name
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var index = require('./routes/index');

app.use(bodyParser.urlencoded({
    extended: true
}));

//routes
app.use('/zoo', index);

//get HTML / catchall route
app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

// Set and get info from Port
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Server now running at port ', app.get('port'));
});
