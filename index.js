const express = require('express');
const app = express();
const handler = require('./handler');
const middleware = require('./middleware');
const upload = require("./upload");
const path = require("path");

const PORT = 8000;

const PUBLIC_DIRECTORY = path.join(__dirname, "public");

// Set format request
app.use(express.urlencoded({ extended: true }));

// Set PUBLIC_DIRECTORY sebagai static files di express
app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.static(path.join(__dirname, "views")));

// Bilang ke express kalo kita mau pake EJS sebagai view engine
app.set("view engine", "ejs");

app.use(express.json())

app.get('/', handler.handleRoot);
app.get('/cars', handler.handleCar);
app.get('/cars/create', handler.handlePageCreateCar);
app.post('/cars', handler.handleCreateCar);
app.get('/cars/:id', middleware.setCar, handler.handleGetCar);
app.get('/cars/:id/update', middleware.setCar, handler.handlePageUpdateCar);
app.post('/cars/:id/update', middleware.setCar, handler.handleupdateCar);
app.get('/cars/:id/delete', middleware.setCar, handler.handleDeleteCar);
app.put("/cars/:id/picture",

app.listen(PORT, () => {
    console.log("server berjalan!")
});