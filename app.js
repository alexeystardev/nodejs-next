const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const database = require('./database')
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "public");

app.use(express.static(publicDirectoryPath));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get('/', (req, res) => {
	res.render('index', {
		title: 'HackerU NodeJs'
	})
})
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About'
	})
})

app.use((req, res) => {
	res.status(404);
	res.render('404');
});

// database
database().then(info => {
    	console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
	app.listen(process.env.PORT || `${process.env.PORT}`, () => {
		console.log(`Server running on port: ${process.env.PORT}...`);
	});
}).catch(() => {
    	console.error("Unable to connect to database")
	process.exit(1)
})