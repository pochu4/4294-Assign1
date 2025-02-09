// Import express from node modules
const express = require("express");
// Creates the server
const app = express();
// Port to run on
const PORT = 3000;

const books = [
    { id: 1, title:"BOOK NAME 1", author:"BOOK AUTHOR 1", imageUrl: "Book image url 1", year: "2025"},
    { id: 2, title:"BOOK NAME 2", author:"BOOK AUTHOR 2", imageUrl: "Book image url 2", year: "2025"},
    { id: 3, title:"BOOK NAME 3", author:"BOOK AUTHOR 3", imageUrl: "Book image url 3", year: "2025"},
]

app.get("/books", (req,res) => {
    res.send(books)
})

app.listen(PORT, ()=> {
    console.log(`HELLO at https://localhost:${PORT}/`)
})