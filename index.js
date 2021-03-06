var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});
app.get('/sql', function(request, response) {
    response.sendFile(__dirname + '/sql.html');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

var Postgres = require('./lib/db');

var sqlBook = require('./lib/sqlBook');

var postgres = new Postgres('db4','db4','db004','140.114.77.23','5432','10',30000);
var postgresFriend = new Postgres('db3','db3','db004','140.114.77.23','5432','10',30000);

app.post('/sql',(request,response)=>{
	var data = request.body;
	var text = data.text;
	postgres.query(text,(result)=>{
		response.send(result);
	});
});

app.get('/getDb3View',(request,response)=>{
	postgresFriend.query(sqlBook.getDb3View(),(result)=>{
		response.send(result);
	});
});

app.get('/getSensorSpeed',(request,response)=>{
	postgres.query(sqlBook.getSensorSpeed(),(result)=>{
		response.send(result);
	});
});

app.post('/insertSensorSpeed',(request,response)=>{
	var data = request.body;
	postgres.query(sqlBook.insertSensorSpeed(data.item,data.speed),(result)=>{
		response.send(result);
	});
});

app.get('/updateWarn',(request,response)=>{
	postgres.query(sqlBook.updateWarn(),(result)=>{
		response.send(result);
	});
});

app.get('/getWarn',(request,response)=>{
	postgres.query(sqlBook.getWarn(),(result)=>{
		response.send(result);
	});
});

app.get('/getBroadcast',(request,response)=>{
	postgres.query(sqlBook.getBroadcast(),(result)=>{
		response.send(result);
	});
});
