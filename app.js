// Import express from node modules
const express = require("express");
// Import books router and save it to variable
const booksRouter = require("./routes/books")
// Creates the server
const app = express();
// Port to run on
const PORT = 3000;
// create path to show current directory
// allows express to find public folder 
const path = require('path');

//Body parser Middleware
const bodyParser = require("body-parser");

// Parse request that is sent to the server
// The parsed data will be converted to json and available with req.body
app.use(bodyParser.json());

// apply all the routes to /api/name
app.use("/api", booksRouter)

// Serve static files from the 'public' directory
// __dirname is global variable that shows the current directory
// Required because it will return the corerct path
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`HELLO at https://localhost:${PORT}/`)
});