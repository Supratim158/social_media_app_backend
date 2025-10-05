const express = require('express');
const connectDB = require("./config/db");
const route = require('./routes/route')

//define the port no
const PORT = 3000;

//create instance of express, our starting point
const app = express();
connectDB();
app.use(express.json());
app.use('/api/auth', route);

app.listen(PORT, "0.0.0.0", function(){
    console.log(`Server running on port ${PORT}`);
    
});