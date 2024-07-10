const express = require("express");
const app = express();

const { connect } = require('mongoose')

async function connectToDb() {
    try {
       await  connect('mongodb://localhost:27017/library')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}
connectToDb()

require("./start/modules")(app, express);
require("./start/run")(app);
