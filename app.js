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
   res.send(characters)
})

app.post('/characters', function(req, res) {
    for (x=0; x < characters.length; x++) {
        if (req.body.indexOf(characters[x]) == -1) {
            characters.splice(x, 1);
        }
    }
    for (x=0; x < req.body.length; x++) {
        if (characters.indexOf(req.body[x]) == -1) {
            characters.push(req.body[x])
        }
    };
    console.log(characters);
    return characters
});

var Users = [
    {"Name": "Max", "id": "1"},
    {"Name": "Laurence", "id": "2"},
    {"Name": "David", "id": "3"},
    {"Name": "Sarah", "id": "4"},
    {"Name": "Spongebob", "id": "5"}
]
app.get("/users/:id", function(req, res) {
    for (x=0; x < Users.length; x++) {
        if (Users[x].id == (req.param('id'))) {
            res.send(Users[x].Name)
    };
}});