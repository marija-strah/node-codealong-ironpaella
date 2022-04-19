const express = require('express');
const app = express();

app.use(express.static('public'));


app.get("/about", (req, res, next) => {
    res.sendFile(__dirname + '/views/about.html');
});


app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + '/views/contact.html');
});


app.listen(3001, () => {
    console.log("server listening to requests...")
});


