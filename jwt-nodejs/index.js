const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { signIn, welcome, refresh } = require('./handlers')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors());
app.options('*', cors());

app.post('/signin', signIn)
app.get('/welcome', welcome)
app.post('/refresh', refresh)

app.listen(8000)

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");    next();
});

