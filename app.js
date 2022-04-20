const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public'));


// app.get("/", (req, res, next)=>{
//     res.sendFile(__dirname + '/views/home.html');
// });

//instead:

/* Routes */

app.get("/", (req, res, next)=>{
    res.render("home");
});



app.get("/about", (req, res, next) => {
    res.sendFile(__dirname + '/views/about.html');
});


app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + '/views/contact.html');
});

app.get("/rice", (req, res, next) => {

    const data = {
        title: "Rice",
        price: 2,
        imageFile: "rice.jpg",
        stores: ["Online", "Albacete", "Freiburg", "Amsterdam"]
    }

    res.render("product", data);
});

app.get("/chicken", (req, res, next) => {
    //res.sendFile(__dirname + '/views/product-chicken.html');

    const data = {
        title: "Chicken",
        price: 5,
        imageFile: "chicken.jpg"
    }

    res.render("product", data);
});

app.get("/seafood", (req, res, next) => {
    //res.sendFile(__dirname + '/views/product-seafood.html');

    const data = {
        title: "Seafood",
        price: 10,
        imageFile: "seafood.jpg"
    }

    res.render("product", data);
});


app.listen(3001, () => {
    console.log("server listening to requests...")
});


