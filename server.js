const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

//body-parser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected ...'))
    .catch(err => console.log(err));

//route for items
app.use('/api/items', items);

//Serve sttic assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));

