//console.log('hello world');

// query DB


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect('mongodb://localhost/ironborn-ecommerce')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  // sth class
//   const productSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     price: {
//         type: Number,
//         min: 1
//     },
//     hasStock: {
//         type: Boolean,
//         default: true
//     },
//     tags: {
//         type: [String],
//         enum: ["vegetables", "food", "fibre", "meat"]
//     },
//     categories: [String],
//     imgSrc: {
//         type: String,
//         default: "https://via.placeholder.com/700x400"
//     }
// });


// const Product = mongoose.model('Product', productSchema);

// Product.create({ title: "chicken", price: 5, hasStock: true, tags: ["food", "fibre"] })
//     .then(product => console.log("a new product was created", product))
//     .catch(error => console.log("error creating a product in DB", error));


//const Movie = mongoose.model('Movie', { title: String, rate: Number });  // schema

// const Product = mongoose.model('Product', { title: String, price: Number});

// Product.create({title: "rice", price: 2})
// .then( (product) => {console.log("a new product was created", product);} )
// .catch( error => console.log("error creating a product in DB", error) );
// // removed curlies bc one line
// // only one argument so we dont need another set of ()


// Product.create({ title: "chicken", price: 5 })
//     .then(product => console.log("a new product was created", product))
//     .catch(error => console.log("error creating a product in DB", error));

//another method to get info from db:

// Product.find()
// .then( (allProducts) => {
//     console.log(allProducts);
// })
// .catch( (error) => {console.log('error getting products from DB', error);})



// Product.find({price: {$gt: 1} })        // all greater than 1 eur
//     .then( (allProducts) => {
//         console.log(allProducts)
//     })
//     .catch( error => console.log("error getting products from DB", error) );

//     Recipe.create({ title: "kao shoi", price: 25 })
//     .then(product => {
//         console.log("a new product was created", product);
//         return Recipe.find()
//     })
//     .then()
//     .then()
//     .catch(error => console.log("error creating a product in DB", error));



// mongoose.connection.close()


// getting products greater than 30 eur

// Product.find({price: {$gt: 30}})
//     .then( (productsArr) => {
//         console.log("products with price above 30....", productsArr)
//     })
//     .catch( err => console.log("error getting products from DB", err));


// Add `store: ["online"]` to all products in the DB

// Product.updateMany({store: "online"})
//     .then( response => console.log("products updated successfully"))
//     .catch( err => console.log("error updating products from DB", err));


// Product.findByIdAndUpdate("6261266500a22706f85d0edb", {price: 40}, {returnDocument: 'after'})
// .then(productFromDB => {console.log("updated successufll", productFromDB)})
// .catch(err => console.log("error updating product", err));