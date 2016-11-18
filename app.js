var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var objectId = require('mongodb').ObjectID;
var mongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;


var myClient = new mongoClient(new Server('localhost', 27017, {}, {}));


url = 'mongodb://user1:password1@ds139567.mlab.com:39567/database1';




app.get('/', function(req, res) {
    res.sendFile('main.html', {root: __dirname});
});


app.use(express.static('public'));




server = app.listen(9000, function(){
    console.log('Running');
});


/* ADD CONTENT TO DATABASE INITIALLY
myClient.connect(url, function(err, db){
    var col = db.collection('familyGuyCharacters');
    col.insert({"name": "Stewie Griffin"}, function(err, suc){});
});
*/


app.get('/characters', function (req, res){
    myClient.connect(url, function(err, db){
        var col = db.collection('familyGuyCharacters');
        cursor = col.find({});
        var docArr = cursor.toArray().then(function(docs) {
            var data = {};
            for (i=0; i < docs.length; i++) {
                data[i] = docs[i];
            }
            res.send(data);
            
        });
    });
});




app.post('/characters', function(req, res) {
    myClient.connect(url, function(err, db){
        var col = db.collection('familyGuyCharacters');
        console.log(req);
        col.insert({"name": req.body.name}, function(err, suc){});
    });
});


app.delete('/characters/:id', function(req, res) {
    myClient.connect(url, function(err, db){
        var col = db.collection('familyGuyCharacters');
        col.deleteOne({_id : new objectId(req.param('id'))}, function(err,suc){})
    });
});   
           
app.put('/characters/:id', function(req, res) {
    myClient.connect(url, function(err, db){
        var col = db.collection('familyGuyCharacters');
        col.update({_id : new objectId(req.param('id'))}, {"name": req.body.name}, function(err,suc){})
    });
});
