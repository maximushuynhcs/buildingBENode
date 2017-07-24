const express = require('express');
const upload = require('./uploadConfig').single('img');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.listen(3000, () => console.log('Server Stated'));

//Back-End
app.get('/', (req, res) => res.render('./adminviews/adminhome'));
app.get('/form', (req, res) => res.render('./adminviews/form'));