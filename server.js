const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
	var log = `${new Date().toString()}: ${request.method} ${request.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) console.log('Unable to append to server log')
	});
	next();
});
// app.use((request, response, next) => {
	// response.render('maintenance.hbs', {
		// pageTitle: 'Maintenance page',
	// });
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home page',
		message: "some more fucking text",
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About page',
	});
});

app.get('/bad', (request, response) => {
	response.send({
		error: 'bad request',
	});
});

app.get('/projects', (request, response) => {
	response.render('projects.hbs', {
		pageTitle: 'Projects page',
	});
});


app.listen(port, () => console.log(`Listening on port ${port}`));