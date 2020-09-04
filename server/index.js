const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");
const routes = require('router')


//middleware
app.use(express.json());
app.use(cors());



//routes
app.use("/data", require("./routes/nairobiHealth"));


app.listen(9000, () => {
    console.log("server started on port 9000"
    );
});








