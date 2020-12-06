const express = require('express');
const cors = require('cors');
const app = express();


//middleware
app.use(express.json());
app.use(cors());


app.listen(9000, () => {
    console.log("server started on port 9000"
    );
});








