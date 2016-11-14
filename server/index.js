var express = require('express'),
	serveStatic = require('serve-static'),
	bodyParser = require('body-parser'),
	app = express(),
	invoices = [
		{"id":0,"date":"2015-05-12T13:40:00.000Z","description":"One day's development work building the thing","amount":311.00,"paid":true},
		{"id":1,"date":"2015-05-12T14:40:00.000Z","description":"Another day's testing work testing the thing","amount":289.00,"paid":false}
	];

app.use(serveStatic(process.cwd()));

app.get('/api/invoices', function (req, res) {
	res.end(JSON.stringify(invoices));
});

app.get('/api/invoices/:id', function (req, res) {
	res.end(JSON.stringify(invoices[req.params.id]));
});

app.post('/api/invoices', bodyParser.json(), function (req, res) {
	var invoice = req.body;
	invoice.id = invoices.length;
	invoices.push(invoice);
	res.end(JSON.stringify(invoice));
});
app.put('/api/invoices/:id', bodyParser.json(), function (req, res) {
	var invoice = req.body;
	if (!req.params.id in invoices) {
		res.end('Invoice ' + req.params.id + ' not found');
	}
	invoice.id = req.params.id;
	invoices[req.params.id] = req.body;
	res.end(JSON.stringify(invoice));
});
app.listen(3000, function () {
	console.log('Listening on port 3000');
});
