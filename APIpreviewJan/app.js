const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const listEndpoints = require('express-list-endpoints')
const path = require('path');
const crypto = require('crypto');
const methodOverride = require('method-override');
const fs = require('fs');
const app = express();
const {validateHeader,schemas} = require('./helpers/routeHelpers');
const cors = require('cors')

mongoose.Promise = global.Promise;

const connstr='mongodb+srv://  ';
mongoose.connect(connstr, {useNewUrlParser:true,useUnifiedTopology: true});
app.use(cors());
app.use(bodyParser({limit: '50mb'}));


app.use(helmet());
app.use(express.json({
    inflate: true,
    limit: '100mb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined
  }))
app.use(methodOverride('_method'));


const users = require('./routes/users');
const orders = require('./routes/orders');
const verification = require('./routes/verification');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/',(req,res,next)=>{
    res.send('Hello');
})
app.use('/users',validateHeader(schemas.tokenSchema,'authorization'), users);
app.use('/orders',validateHeader(schemas.tokenSchema,'authorization'), orders);
app.use('/verify',verification)
app.use('/*',(req,res,next) => {
    res.json("404 - Not found ;)")
})
console.log('All Routes for testing: ',listEndpoints(app));


app.use((req,res,next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res.status(status).json({
        error: {
            message: error.message
        }
    })
    // console.error(err);
});

const PORT = process.env.PORT || 2531
app.listen(PORT, () => console.info(`Started on port ${PORT}`));

