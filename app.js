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
    res.sendFile('main.html', {root: __dirname})
})

app.use(express.static('public'));


server = app.listen(9000, function(){
    console.log('Running');
});

var characters = ['Meg Griffin', 'Tom Tucker', 'Peter Griffin'];

app.get('/characters', function (req, res) {
   res.send(characters);
})

app.post('/characters/:char', function(req, res) {
    characters.push(req.param('char'));
});

app.delete('/characters/:char', function (req, res) {
    if (characters.indexOf(req.param('char')) != -1) {
        characters.splice(characters.indexOf(req.param('char')), 1);
    }
});

app.put('/characters/:char', function(req, res) {
    characters[characters.indexOf(req.param('char'))] = req.body.data;
})




var users = [
    {"name": "Max", "id": "1"},
    {"name": "Laurence", "id": "2"},
    {"name": "David", "id": "3"},
    {"name": "Sarah", "id": "4"},
    {"name": "Spongebob", "id": "5"}
]

app.get("/users/:id", function(req, res) {
    for (x=0; x < users.length; x++) {
        if (users[x].id == (req.param('id'))) {
            res.send(users[x].name)
    };
}});