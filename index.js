const express = require('express');
const session = require('express-session');
const upload = require('./uploadConfig').single('img');
const cookieParse = require('cookie-parser');

const user = require('./models/users');
const db = require('./db');
const userManager = require('./controllers/userManager')

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
app.get('/login', userManager.loginRedirect);
app.get('/signUp',userManager.registerRedirect);

app.post('/signUp', parser, userManager.signUp);
// app.post('/signIn', parser, userManager.signIn);