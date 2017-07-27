const express = require('express');
const upload = require('./uploadConfig').single('img');

const user = require('./models/users');
const db = require('./db');

const userManager = require('./controllers/userManager')
const User = require('./models/users');

const app = express();
const parser = require('body-parser').urlencoded( {extended: false });

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.listen(3000, () => console.log('Server Stated'));

//Back-End
app.get('/', (req, res) => res.render('./adminviews/adminhome'));
app.get('/form', (req, res) => res.render('./adminviews/form'));

//signUp - signIn
app.get('/signIn', userManager.loginRedirect);
app.get('/signUp', userManager.registerRedirect);

app.post('/signIn', parser, userManager.signIn);
app.post('/signUp', parser, userManager.signUp);