import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from "cors";
// const express = require('express');
// const bodyParser = require('body-parser');
// const configViewEngine = require('./config/viewEngine');
// const initWebRoutes = require('./route/web');
// const connectDB = require('./config/connectDB');
require('dotenv').config();

let app = express();
app.use(cors());//cho phep frontend goi api

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})