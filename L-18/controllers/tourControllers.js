const Tour = require('../models/tourModel')

module.exports.getAllTours = async (req, res) => {
    const { query } = req
    const { sort = 'price' , ...filters} = query
    try {
        let query = Tour.find(filters)
        const sortingParams = sort.split(',').join(' ')
        query = query.sort(sortingParams)

        const allTours = await query
        
        res.status(200)
        res.send({
            status : 'success' ,
            body : {
                tours : allTours,
            }
        })
    }
    catch {
        console.log(err);
        res.status(404)
        res.send({
            status : 'fail',
            message : err.message,
        })
    }
}

module.exports.createTours = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body)
        
        console.log("entry updated")
        res.status(201);
        res.send({
            status: 'success',
            body:{
                tour: newTour
            }
        });
    }
    catch {
        console.log(err);
        res.status(404)
        res.send({
            status : 'fail',
            message : err.message,
        })
    }
}

module.exports.getTour = async(req, res) => {
    const { id: paramId } = req.params;
    try{
        const tours = await Tour.findOne({
            "_id": paramId
        });
        if(!tours) throw new Error("Invalid Tour Id");
        res.status(200);
        res.json({
            status: 'success',
            body:{
                tour: tours
            }
        });
    }
    catch(err){
        res.status(404);
        res.json({
            status: 'fail',
            message:err.message,
        });
    }
}

module.exports.patchUpdateTour = async (req, res) => {    
    const {id : paramID} = req.params
    const {_id , __v, createdAt, updatedAt ,...body} = req.body
    try {
        const updatedTour = await Tour.findOneAndUpdate({"_id" : paramID} , body , {
            new : true 
        })
        if (!updatedTour)
        throw new Error("Invalid Tour Id")
        console.log("entry updated")
        res.status(201);
        res.json({
            status: 'success',
            body : updatedTour
        });
    }
    catch  (err) {
        res.status(404)
        res.send({
            status : 'fail',
            message : err.message,
        })
    }
}

module.exports.putUpdateTour= async (req, res) => {
    const {id : paramID} = req.params
    try {
        const updateTour = await Tour.findOneAndReplace({"_id" : paramID } , req.body , {
            new : true ,
            runValidators : true
        })
        console.log(updateTour)
        if (!updateTour)
        throw new Error("Invalid Tour Id")
        console.log("entry updated")
        res.status(200);
        res.json({
            status: 'success',
            body : updateTour
        });
    }
    catch (err) {
        res.status(404)
        res.send({
            status : 'fail',
            message : err.message,
        })
    }
}

module.exports.deleteTour = async (req, res)=> {
    const {id : paramID} = req.params
    try {
        const deleteTour = await Tour.findOneAndDelete({
            "_id" : paramID
        })
        if (!deleteTour)
        throw new Error("Invalid Tour Id")
        console.log("entry updated")
        res.status(204);
        res.json({
            status: 'success',
            body : null
        });
    }
    catch (err) {
        res.status(404)
        res.send({
            status : 'fail',
            message : err.message,
        })
    }
}