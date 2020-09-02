require("./config/config.js");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
//settings
app.set("port", process.env.PORT || 3000);


//Middlewares
app.use(express.urlencoded({ extended: false }));


//Routes
app.use(require("./routes/index.routes.js"));


module.exports=app;


