const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
mongoose.Promise = global.Promise;
require('dotenv/config');
// middlewares
app.use(cors())
app.use('/profile', express.static('upload/images'));

app.use(bodyParser.json());

const wakeCapRoutes = require('./routes/wakeCap.routes');
wakeCapRoutes.setRoutes(app);
// connect to db
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true ,useFindAndModify:false}, () => {
        console.log("connected to database")
    })

// listening to the server
app.listen(process.env.PORT || 3000);