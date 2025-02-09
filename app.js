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

// FIrst endpoint that returns the todos
// url, code that processes it 
// req=request, res=response
app.get("/books", (req,res) => {
    res.send(books);
});


// Express allows :id as an endpoint instead of each id
// Becomes a variable accessible in req.params.id
app.get("/books/:id", (req,res) => {

    //Pass in value from url to become a number
    const requestedId = Number(req.params.id)

    // This find loops thru books and runs the callback function as true or false
    const bookData = books.find( (books) => {
        // Put new variable rather than a single number
        return books.id === requestedId ;
    })

    // If statement to handle errors if id is not existing
    if(bookData !== undefined) {
        res.send(bookData)
    } else {
        res.status(404).send("Book not found")
    }
})

// POST
// This runs if req method is post 
app.post("/books", (req,res) => {

    // Create variable to combine data as they are sent
    let bodyData = "";

    // When data is received, add it to above as string
    req.on("data", chunk => {
        bodyData += chunk.toString();
    })

    // Runs when all data is sent 
    req.on("end", () => {

        // Parse the string created above
        const book = JSON.parse(bodyData);
        book.id = books.length + 1; 
        books.push(book);

        // Send back object
        res.status(201).send(book)
    });

});

// PUT REQUEST
app.put("/books/:id", (req, res) => {

    // Create var to store data
    let bodyData = "";

    // Attach chunk of data to string
    req.on("data", (chunk) => {

        bodyData += chunk.toString();

    });

    // Once all data sent, continue
    req.on("end", () => {

        // Process and change id and store it
        const requestedId = Number(req.params.id);

        // Return the todo in array
        const bookData = books.find( book => {
            return book.id === requestedId;
        });

        
        if(bookData !== undefined) {
            // if found turn title into object
            const bodyObj = JSON.parse(bodyData);
            // replace old text with new data
            bookData.title = bodyObj.title
            // send updated todo
            res.send(bookData);

        } else {
            // if id doesnt exist, return 404 and message
            res.status(404).send("Book not Found!")
        }

    })

})

// DELETE
app.delete("/books/:id", (req, res) => {

    // Converting id to numba
    const requestedId = Number(req.params.id);

    // Return the match and store in in var
    const bookData = books.find(book => {
        return book.id === requestedId;
    });

    // IF match is undefined return 404
    if(bookData !== undefined){

        // CHange id into index by removing 1
        // Amount to remove = 1
        books.splice( (bookData.id - 1), 1);

        // Send delete message
        res.status(204).send("Reminder Deleted");

    } else {

        // Send 404 if reminder doesn't exist
        res.status(404).send("Reminder not found");

    }

});

app.use((req, res) => {

    res.status(404).send("Sorry resource missing")

})

app.listen(PORT, ()=> {
    console.log(`HELLO at https://localhost:${PORT}/`)
});