const express = require('express')

const tourController = require('../controllers/tourControllers.js')

const tourRouter = express.Router()

tourRouter
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTours)
    
tourRouter
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.patchUpdateTour)
    .put(tourController.putUpdateTour)
    .delete(tourController.deleteTour)


// chaining

// tourRouter
//     .route('/:id')
//     .get(tourController.checkID , tourController.getTour)
//     .patch(tourController.checkID , tourController.patchUpdateTour)
//     .put(tourController.checkID , tourController.putUpdateTour)
//     .delete(tourController.checkID , tourController.deleteTour)
// 
//  note - remove val from checkID , instead use param id because only .param sends val as an extra argument, others do not

module.exports = tourRouter 