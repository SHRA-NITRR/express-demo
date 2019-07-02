const express = require('express');
const Chance= require('chance');
const Joi=require('joi');

const chance=new Chance();

const app=express();
app.use(express.json());

const allCousres=[
    {id:1, course:'course1'},
    {id:2,course:'course1'},
    {id:3,course:'course1'},
    {id:4,course:'course1'}
]
app.get('/', (req, res)=>{
    res.send(`Hi ${chance.first()}!`)
});

app.get('/api/courses', (req, res)=>{
    res.send(allCousres);
});

app.get('/api/courses/:id',(req, res)=>{
    const course=allCousres.find((course)=>course.id===parseInt(req.params.id));

    if(!course) res.status(404).send('Requested course not available!');

    res.send(course);
})

app.post('/api/courses',(req, res)=>{
    const schema={
        course: Joi.string().min(3).required()
    };

    const result =Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course={
        id:allCousres.length+1,
        course: req.body.course
    }

    allCousres.push(course);
    res.send(allCousres);
})


app.put('/api/courses/:id',(req, res)=>{

    const course=allCousres.find((course)=>course.id===parseInt(req.params.id));

    if(!course) {
        res.status(404).send('Requested course not available!');
        return;
    }

    const schema={
        course: Joi.string().min(3).required()
    };

    const result =Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    course.course=req.body.course;
    res.send(allCousres);
})


app.delete('/api/courses/:id',(req, res)=>{
    const course=allCousres.find((course)=>course.id===parseInt(req.params.id));

    const index=allCousres.indexOf(course);

    if(index===-1) {
        res.status(404).send('Requested course not available!');
        return;
    }

    allCousres.splice(index,1);
    res.send(allCousres);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening at ${port}.....`));