const express = require ("express");
// Create new set of routes
const router = express.Router();

// Previously had /public/imagename 
// But this is now redundant due to the express.static line in appjs
const books = [
    { id: 1, title: "The Lightning Thief", author: "Rick Riordan", imageUrl: "/lightning-thief.jpg", year: "2005" },
    { id: 2, title: "The Sea of Monsters", author: "Rick Riordan", imageUrl: "/sea-of-monsters.jpg", year: "2006" },
    { id: 3, title: "The Titan's Curse", author: "Rick Riordan", imageUrl: "/titans-curse.jpg", year: "2007" },
]

// Find and reutnr book
function findBookById(req, res, next) {

    // get id from url
    const requestedId = Number(req.params.id);

    // save matching array item to bookData
    const bookData = books.find((singleBook) => {

        return singleBook.id === requestedId;

    })

    //If it exists attach it to request as new prompt (.book)
    if (bookData !== undefined) {

        req.book = bookData;
        next();

    } else {

        // 404 if id dont exist
        res.status(404).send("Error, Book Not Found");

    }

    next();
}

// replaced app with router for all

// FIrst endpoint that returns the todos
// url, code that processes it 
// req=request, res=response
router.get("/books", (req, res) => {
    res.send(books);
});


// Express allows :id as an endpoint instead of each id
// Becomes a variable accessible in req.params.id
router.get("/books/:id", findBookById, (req, res) => {

    // //Pass in value from url to become a number
    // const requestedId = Number(req.params.id)

    // // This find loops thru books and runs the callback function as true or false
    // const bookData = books.find( (books) => {
    //     // Put new variable rather than a single number
    //     return books.id === requestedId ;
    // })

    // // If statement to handle errors if id is not existing
    // if(bookData !== undefined) {
    //     res.send(bookData)
    // } else {
    //     res.status(404).send("Book not found")
    // }

    res.send(req.book);

})

// POST
// This runs if req method is post 
router.post("/books", (req, res) => {

    // // Create variable to combine data as they are sent
    // let bodyData = "";

    // // When data is received, add it to above as string
    // req.on("data", chunk => {
    //     bodyData += chunk.toString();
    // })

    // Runs when all data is sent 
    // req.on("end", () => {

        // Parse the string created above
        // Parse the json sent to this url
        // then add new property of id
        // add it to end of array
        const book = req.body
        book.id = books.length + 1;
        books.push(book);

        // Send back object
        res.status(201).send(book)
    // });

});

// PUT REQUEST
router.put("/books/:id", findBookById, (req, res) => {

    // // Create var to store data
    // let bodyData = "";

    // // Attach chunk of data to string
    // req.on("data", (chunk) => {

    //     bodyData += chunk.toString();

    // });

    // // Once all data sent, continue
    // req.on("end", () => {

        // // Process and change id and store it
        // const requestedId = Number(req.params.id);

        // // Return the todo in array
        // const bookData = books.find( book => {
        //     return book.id === requestedId;
        // });


        // if(bookData !== undefined) {
        // if found turn title into object
        const bodyObj = req.body;
        // replace old text with new data
        req.book.title = bodyObj.title
        // send updated todo
        res.send(req.book);

        // } else {
        //     // if id doesnt exist, return 404 and message
        //     res.status(404).send("Book not Found!")
        // }

    // })

})

// DELETE
router.delete("/books/:id", findBookById, (req, res) => {

    // // Converting id to numba
    // const requestedId = Number(req.params.id);

    // // Return the match and store in in var
    // const bookData = books.find(book => {
    //     return book.id === requestedId;
    // });

    // IF match is undefined return 404
    // if(req.book !== undefined){

    // CHange id into index by removing 1
    // Amount to remove = 1
    //remove todoobject from group
    books.splice((req.book.id - 1), 1);

    // Send delete message
    res.status(204).send("Reminder Deleted");

    // } else {

    //     // Send 404 if reminder doesn't exist
    //     res.status(404).send("Reminder not found");

    // }

});

router.use((req, findBookById, res) => {

    res.status(404).send("Sorry resource missing")

})

module.exports = router;