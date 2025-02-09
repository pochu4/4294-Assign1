// Import express from node modules
const express = require("express");
// Import books router and save it to variable
const booksRouter = require("./routes/books")
// Creates the server
const app = express();
// Port to run on
const PORT = 3000;

//Body parser Middleware
const bodyParser = require("body-parser");

// Parse request that is sent to the server
// The parsed data will be converted to json and available with req.body
app.use(bodyParser.json());

// apply all the routes to /api/file
app.use("/api", booksRouter)

app.listen(PORT, () => {
    console.log(`HELLO at https://localhost:${PORT}/`)
});