const express = require('express')
const morgan = require('morgan')
const app = express()


const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.use(express.json());
app.use(morgan('dev'));
app.use((req ,res, next)=> {
    res.append('Server-Time', new Date().toISOString())
    res.append('Secret-Key' , 'From 6 to 9 to 6T9')
    next()
})

app.use('/api/v1/tours' , tourRouter)
app.use('/api/v1/users' , userRouter)



app.listen(6969, ()=> {
    console.log('________________Server Started________________')
}) 