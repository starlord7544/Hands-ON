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

module.exports = tourRouter 