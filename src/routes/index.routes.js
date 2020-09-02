const express= require('express');
const app= express();

app.use(require("./users.routes.js"));
app.use(require("./login.routes.js"));


module.exports= app;