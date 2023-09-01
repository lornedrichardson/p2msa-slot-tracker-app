// DEPENDENCIES
const express = require('express');
const app = express();
const cors = require('cors');

//CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CONTROLLER
const gameDataControllers = require('./controllers/gameData_controller')
app.use('api/game',gameDataControllers)
const userDataController = require('./controllers/userData_controller')
app.use('api/user',userDataController)

//LISTEN
app.listen(4005, () => {
    console.log('Server is running on port 4005');
})