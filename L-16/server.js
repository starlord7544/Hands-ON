const app = require('./app.js')
const mongoose = require('mongoose')


const port = 6969


const DATABASE_URL = "mongodb+srv://<USERNAME>:<password>@cluster0.cup2spz.mongodb.net/"
//  mongodb+srv://starlord7544:<password>@cluster0.cup2spz.mongodb.net/
const DATABASE_USERNAME = "starlord7544"
const DATABASE_PASSWORD = "starlord7544"

const db_url = DATABASE_URL.replace('<USERNAME>', DATABASE_USERNAME).replace('<PASSWORD>', DATABASE_PASSWORD)
mongoose.connect(db_url).then((con)=>{
    console.log('-------------Connected to Database------------');
});

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
    description: String
});

const Tour = mongoose.model('Tour', toursSchema);

const testTour = new Tour({
    name: 'Shivalk',
    rating: 0.1,
    price: 69,
    description: "Campus kaha hai??"
})

testTour.save()
.then((doc)=>{
    console.log('-------------------DOC Created------------');
    console.log(doc);
})
.catch((err)=>{
    console.log('ERROR::', err);
})

app.listen (port, ()=> {
    console.log('________________Server Started________________')
}) 
