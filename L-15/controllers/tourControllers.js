const fs = require('fs')
const fsPromises = require('fs/promises')

const tours = JSON.parse(fs.readFileSync('./data/tours-data.json'))

module.exports.getAllTours = (req, res) => {
    res.status(200)
    res.json({
        status : 'success',
        results : tours.length ,
        body : {
            tours
        }
    })
}

module.exports.createTours = (req, res) => {
    const data = req.body;
    console.log(data);
    
    const id = tours[tours.length-1].id + 1;
    const newEntry = {id:id , ...data};
    console.log(newEntry);
    console.log("Before entry")
    fsPromises.writeFile('./data/tours-data.json', JSON.stringify([...tours, newEntry]));
    
    console.log("entry updated")
    res.status(201);
    res.send({
        status: 'success',
        body:{
            tour: newEntry
        }
    });
}

module.exports.getTour = (req , res) => {
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
}

module.exports.patchUpdateTour = (req, res) => {
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
}

module.exports.putUpdateTour=(req, res) => {
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
}

module.exports.deleteTour = (req, res)=> {
    const { id : paramId } = req.params;
    let idx = -1
    idx = tours.findIndex((ele) => ele.id == paramId)

    tours.splice(idx , 1);

    fsPromises.writeFile('./data/tours-data.json', JSON.stringify(tours));

    res.status(204);
    res.send({
        status: 'success',
        body:{
            tour: null
        }
    })
}