const express = require("express");
const app = express();

app.get("/", (req,res) => {
    res.send("hello World");
});


app.get("/api/courses", (req,res) => {
    res.send([1,2,3]);
});

// /api/courses/1
// define the paramater , id is the name of the paramater 

app.get("/api/courses/:id", (req,res) =>{
    res.send (req.params.id);
});

//Port hh
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));