const mongoose = require('mongoose');
const Product = require("../models/Product.model");
const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public'));

// connect to DB
mongoose
  .connect('mongodb://localhost/ironborn-ecommerce')
  .then(x => {
      return console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => console.error('Error connecting to mongo', err));


const products = [
    {
        title: "Rice",
        price: 2,
        imgFile: "rice.jpg",
    },
    {
        title: "Chicken",
        price: 5,
        imgFile: "chicken.jpg"
    },
    {
        title: "Seafood",
        price: 10,
    }
];


Product.insertMany(products)
    .then( response => {
        console.log(`${response.length} products created!`);
        console.log(response);
        
    } )
    .catch( err => {
        console.log("error creating products in DB");
        console.log(err);
    })
    .finally( () => {
        mongoose.connection.close();
    });