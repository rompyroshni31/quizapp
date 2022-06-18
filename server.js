const express = require('express');
const mongoose = require('mongoose');
const path = require('path');



const app = express();

//Bodyparser Middleware
app.use(express.json());

//Connect to db
const db = require('./config/mongoose');

//Use routes
app.use('/api/tasks',require('./routes/api/tasks'));
app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


//Express server
const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
