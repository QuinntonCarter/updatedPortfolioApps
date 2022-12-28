const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

const port = 8888

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
    'mongodb://localhost:27017/rockTheVote',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['sha1', 'RS256', 'HS256'] }));
app.use('/api/posts', require('./routes/postRouter.js'));
app.use('/api/comment', require('./routes/commentRouter.js'));

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }   
    return res.send({errMsg: err.message})
})

app.listen(port, () => {
    console.log(`Server is running on local port ${port}`)
})