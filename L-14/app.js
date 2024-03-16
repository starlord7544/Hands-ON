const fs = require('fs')
const fsPromises = require('fs/promises')
const express = require('express')
const app = express()

const tours = JSON.parse(fs.readFileSync('./data/tours-data.json'))

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Home Page')
})

app.get('/api/v1/tours', function (req, res) {
    res.status(200)
    res.json({
        status : 'success',
        results : tours.length ,
        body : {
            tours
        }
    })
})


app.post('/api/v1/tours', function (req, res) {
    const data = req.body;
    console.log(data);
    
    const id = tours[tours.length-1].id + 1;
    const newEntry = {id:id , ...data};
    console.log(newEntry);
    
    fsPromises.writeFile('./data/tours-data.json', JSON.stringify([...tours, newEntry]));
    console.log("entry updated")
    res.status(201);
    res.send({
        status: 'success',
        body:{
            tour: newEntry
        }
    });
})

app.get('/api/v1/tours/:id', function (req , res) {
    // const data = req.body
    const {id : paramId} = req.params
    const resource = tours.find( (ele) => ele.id == paramId)
    res.status(200)
    res.send({
        status : "success",
        body : {

            tour : resource
        }
    })
})

app.patch('/api/v1/tours/:id', function (req, res) {
    const data = req.body;
    const { id : paramId } = req.params;

    const resource = tours.find( (ele) => ele.id == paramId)
    const newResource = {...resource , ...data}

    const newTours = tours.map((elem)=>{
        if(elem.id==paramId){
            return newResource;
        }
        else{
            return elem;
        }
    })

    fsPromises.writeFile('./data/tours-data.json', JSON.stringify(newTours));

    res.status(201);
    res.send({
        status: 'success',
        body:{
            tour: newResource
        }
    })
})

app.put('/api/v1/tours/:id', function (req, res) {
    const data = req.body;
    const { id : paramId } = req.params;

    const newResource = {id : paramId , ...data}

    const newTours = tours.map((elem)=>{
        if(elem.id==paramId){
            return newResource;
        }
        else{
            return elem;
        }
    })

    fsPromises.writeFile('./data/tours-data.json', JSON.stringify(newTours));

    res.status(201);
    res.send({
        status: 'success',
        body:{
            tour: newResource
        }
    })
})

app.delete('/api/v1/tours/:id', function (req, res) {
    const { id : paramId } = req.params;
    let idx = -1
    idx = tours.findIndex((ele) => ele.id == paramId)
    if (idx === -1) {
        res.status(404)
        res.send({
            status: 'error',
            message: 'Tour not found',
        });
    }

    tours.splice(idx , 1);

    fsPromises.writeFile('./data/tours-data.json', JSON.stringify(tours));

    res.status(204);
    res.send({
        status: 'success',
        body:{
            tour: null
        }
    })
})


app.listen(6969, ()=> {
    console.log('________________Server Started________________')
}) 