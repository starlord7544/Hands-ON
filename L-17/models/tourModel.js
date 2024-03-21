const mongoose = require('mongoose')

// const toursSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Tour name is mandatory"],
//         unique: true,
//     },
//     price:{
//         required: true,
//         type: Number,
//     },
//     rating:{
//         type: Number,
//         default: 4.5,
//     },
//     description: String
// });

const toursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tour name is mandatory"],
        unique: true,
    },
    price:{
        required: true,
        type: Number,
    },
    rating:{
        type: Number,
        default: 4.5,
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    duration:{
        type: Number,
    },
    difficulty:{
        type: String,
        default: "medium",
    },
});

const Tour = mongoose.model('Tour' , toursSchema);

module.exports = Tour
