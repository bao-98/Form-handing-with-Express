import express from "express";
const app = express();
const server = app.listen(3000, () => {
    console.log("listening");
});

// Write a server application to accept form submissions from an HTML
// form on a client webpage and send a response back to the client

// Step 1: send a webpage with a form to the client - use a pre-built middleware that is part of the Express framework to automatically serve static files.

// this middleware will make all files in the public folder accessible (automatically send them without using res.sendFile).
// 'public' does not appear in the URL path, but subfolders within public would be required
app.use(express.static('public'));

// this middleware decodes the request body so we can access the form data.
app.use(express.urlencoded({extended:true}));

// Validation: checking the data that was submitted in the form to make sure it's in the right format, doesn't contain anything harmful, etc. 
const validationMiddleware = (req, res, next) => {
    // should create an error if something in the form has been filled incorrectly. OR if the form has been filled correctly, it should do nothing.
    res.locals.errors = ""; // add error messages to this string if we find errors
    // CHALLENGE: the student number MUST have 3 digits. If the number entered by the user has more or fewer digits, create an error.
    if(req.body.studentNumber.length != 3) {
        res.locals.errors += "Student number must have 3 digits.";
    }
    next();
}

// Receive POST requests to /courses and send a response
app.post('/courses', validationMiddleware, (req, res)=>{
    // The part of the HTTP request that has form data is the body - before we can access the body we have to decode it using an Express middleware 
    if(res.locals.errors == "") {
        res.send(`
            <h1>${req.body.lastName}</h1>
            <p>${req.body.studentNumber}</p>
            `);
    } else {
        res.send("ERROR: " + res.locals.errors);
    }
   
    // CHALLENGE: send an HTML response with the last name in an h1 heading and the student number in a paragraph.
});