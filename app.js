const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product.model');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect('mongodb://localhost/ironborn-ecommerce')
  .then(x => {
      return console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => console.error('Error connecting to mongo', err));


  // Now for the images I think might be somwthing in the product hbs file. The name of the image property might be different

// app.get("/", (req, res, next)=>{
//     res.sendFile(__dirname + '/views/home.html');
// });

//instead:

// mine -old way

// app.get("/", (req, res, next)=>{
//     res.render("home");
// });



// app.get("/about", (req, res, next) => {
//     res.sendFile(__dirname + '/views/about.html');
// });


// app.get("/contact", (req, res, next) => {
//     res.sendFile(__dirname + '/views/contact.html');
// });

// app.get("/rice", (req, res, next) => {

//     const data = {
//         title: "Rice",
//         price: 2,
//         imageFile: "rice.jpg",
//         stores: ["Online", "Albacete", "Freiburg", "Amsterdam"]
//     }

//     res.render("product", data);
// });

// app.get("/chicken", (req, res, next) => {
//     //res.sendFile(__dirname + '/views/product-chicken.html');

//     const data = {
//         title: "Chicken",
//         price: 5,
//         imageFile: "chicken.jpg"
//     }

//     res.render("product", data);
// });

// app.get("/seafood", (req, res, next) => {
//     //res.sendFile(__dirname + '/views/product-seafood.html');

//     const data = {
//         title: "Seafood",
//         price: 10,
//         imageFile: "seafood.jpg"
//     }

//     res.render("product", data);
// });

/* Routes */

app.get("/", (req, res, next)=>{
    res.render("home");
});


app.get("/about", (req, res, next) => {
    res.render("about");
});


app.get("/contact", (req, res, next) => {
    res.render("contact");
});

// You can access the products but can't access about page and contact, right?



//lines 103 to 160 are redone better with route params in line 165
// app.get("/rice", (req, res, next) => {


//     // The title is in uppercase in the database?
//     // 
//     Product.findOne({title: 'Rice'})
//     .then( (productDetails) => {       // productDetails is an obj
//         console.log(productDetails);
//         res.render("product", productDetails)   // send as 2nd argument
//     })
//     .catch(error => console.log(error));

//     // const data = {
//     //     title: "Rice",
//     //     price: 2,
//     //     imageFile: "rice.jpg",
//     //     stores: ["Online", "Albacete", "Freiburg", "Amsterdam"]
//     // }

//     // res.render("product", data); // send to then above in a function bc jas wont wait for reponse, async
// });


// app.get("/chicken", (req, res, next) => {

//     // const data = {
//     //     title: "Chicken",
//     //     price: 5,
//     //     imageFile: "chicken.jpg"
//     // }

//     // res.render("product", data);

//     Product.findOne({title: 'Chicken'})
// .then ((productDetails) => {
// console.log(productDetails);
// res.render("product", productDetails)
// })
// .catch(error => console.log(error))
// });


// app.get("/seafood", (req, res, next) => {

//     // const data = {
//     //     title: "Seafood",
//     //     price: 10,
//     // }

//     // res.render("product", data);

//     Product.findOne({title: 'Seafood'})
// .then ((productDetails) => {
// console.log(productDetails);
// res.render("product", productDetails)
// })
// .catch(error => console.log(error))
// });

app.get("/products", (req, res, next) => {

    //const max = req.query.maxPrice;
    // variable max comes from req query


    let filter;
    const max = req.query.maxPrice;
    
    if(max === undefined){
        filter = {};
    } else {
        filter = {price: {$lte: max} };
    }


    Product.find(filter)
        .then( productsArr => {

            // alternative - avoid bc could produce long arrays
            // const newArr = productsArr.filter(product => product.price < max);

            res.render("productList", {products: productsArr})
        })
        .catch( error => console.log("error getting products from DB", error) );

})

// route params

app.get("/products/:productId", (req, res, next) => {
    Product.findById(req.params.productId)
        .then(productDetails => {
            console.log(productDetails);
            res.render("product", productDetails);
        })
        .catch(error => console.log("error getting product from DB", error));
})


//my try:
// app.get("/products", (req, res, next) => {
//     Product.findById(req.query.price)
//     .then(filterPrice => {
//         if (filterPrice < 2) {
//         console.log(filterPrice);
//         res.render("product", filterPrice)
//     }
//     })
//     .catch(error => console.log("error filtering", error));
// })


app.post("/new", (req, res, next) => {
    // console.log("creating new productss...");
    // console.log(req.body);


    const newProduct = {    // prevent users from adding fields manually
        title: req.body.title,
        price: req.body.price
    };

    Product.create(newProduct)      //returns a promise
    .then( newProduct => {
        console.log("new product was created");
        console.log(newProduct);
        res.redirect("/products"); //redirect to the products page
    })
    .catch(error => console.log("error creating a new product", error));
})


app.listen(3001, () => {
    console.log("server listening to requests...")
});


