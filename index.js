const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
];



app.get("/", (req,res) => {
    res.send("hello World");
});


app.get("/api/courses", (req,res) => {
    res.send(courses);
});

// /api/courses/1
// define the paramater , id is the name of the paramater 

app.get("/api/courses/:id", (req,res) =>{
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) res.status(404).send("The courses is not found!") //404 object not found standard convention 
res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params);
});


app.post("/api/courses", (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);
    if(result.error){
        // 400 bad request
        res.status(400).send(result.error)
        return;
    }
   const course = {
id: courses.length +1,
name: req.body.name
   
   };
   courses.push(course);
   res.send(course);
});


app.put ("/api/courses/:id", (req,res) =>{
    //Look up the course
    // if not existing we return 404 
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The courses is not found!") //404 object not found standard convention 
    // validate 
    // if invalid, return 400- bAD REQUEST 
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error){
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //update course
    // return the updated course 
});
//Port hh
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));