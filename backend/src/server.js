
const express = require('express');//load framework express
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../env') });//read data form .env

const app = express();
const indexRouter = require('./routes/index'); //make indexRouter form file index.js in routes

//set up View Engine
app.set('view engine', 'ejs'); //use EJS for template engine
app.set('views', path.join(__dirname, 'views'));

//set up File static(css, js, image) from frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.urlencoded({ extended: true }));//real data form HTML
app.use('/', indexRouter); //handle date in route form '/'
const PORT = process.env.PORT || 8386; //read port form .env gate:8386

app.listen(PORT, () => {
    console.log('Server is flying at sky gate: 8386');
})

