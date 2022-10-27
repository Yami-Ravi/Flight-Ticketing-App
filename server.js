const express = require('express');
const bodyParser = require('body-parser');
const api = require('./router');

//Database Conn via Mongoose - Starts
const mongoose = require('mongoose')

const url = 'mongodb+srv://yamiravi:yamiravi%40123@cluster0.tii9lg8.mongodb.net/Airline-Ticketing?retryWrites=true&w=majority';

const db = (url);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});
//Database Conn via Mongoose - Ends

//Server starts & To Application Router - Starts
const port = process.env.PORT||8080;
const app = express();

app.listen(port);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/airline-ticketing', api);
//Server starts & To Application Router - Ends
