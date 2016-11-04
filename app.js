var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var myClient = new mongoClient(new Server('localhost', 27017, {}, {}));

 /*
myClient.open(function(err, suc){
    console.log('hello')
    if (suc) {
        myDatabase = myClient.db('mainDatabase');  
    }
    if (err) {
        console.log('error')
    }
});

myDatabase.close();

*/

app.get('/', function(req, res) {
    res.sendFile('main.html', {root: __dirname});
});

app.use(express.static('public'));


server = app.listen(9000, function(){
    console.log('Running');
});

var characters = {"1":
                     {"id": 1, "name":"Meg Griffin"},
                 "2":
                     {"id": 2, "name":"Peter Griffin"},
                 "3":
                     {"id": 3, "name": "Brian Griffin"}
                 };


var keyCount = 4;

app.get('/characters', function (req, res){
    res.send(characters);
});

app.post('/characters', function(req, res) {
    var newEntity = {"id":keyCount, "name":req.body.name};
    characters[keyCount.toString()] = newEntity;
    keyCount += 1;
    console.log(characters);

});

app.delete('/characters/:id', function(req, res) {
    keys = Object.keys(characters);
    index = keys.indexOf(req.param('id'));
    delete characters[keys[index]];
});

app.put('/characters/:id', function(req, res) {
    keys = Object.keys(characters);
    index = keys.indexOf(req.param('id'));
    characters[keys[index]].name = req.body.data;
});





var users = [
    {"name": "Max", "id": "1"},
    {"name": "Laurence", "id": "2"},
    {"name": "David", "id": "3"},
    {"name": "Sarah", "id": "4"},
    {"name": "Spongebob", "id": "5"}
];

app.get("/users/:id", function(req, res) {
    for (x=0; x < users.length; x++) {
        if (users[x].id == (req.param('id'))) {
            res.send(users[x].name);
    };
}});