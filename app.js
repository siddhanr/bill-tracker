var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('billtracking', ['bills']);
var ObjectId = mongojs.ObjectId;

var app = express();

// View Engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', {title:'index'});
});

app.post('/bills/add', function(req, res){
	var newBills = {
		name: req.body.name,
		amount: parseInt(req.body.amount)
	};
	db.bills.insert(newBills);
	res.redirect('/');
});

app.get('/bills/all', function(req, res){
	db.bills.find(function(err, docs) {
		res.json(docs);
	});
});

app.delete('/bills/delete/:id', function(req, res){
	db.bills.remove({_id:ObjectId(req.params.id)});
});

app.get('/bills/total', function(req, res){
	db.bills.aggregate([{$group:{_id:null, total: {$sum:"$amount"}}}],
		function(err, docs){
			res.json(docs);
		})
});

app.listen(3000, function(){
	console.log('Server started on port 3000...')
})