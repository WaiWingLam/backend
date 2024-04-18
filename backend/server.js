const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/ArtList'

mongoose.connect(uri, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true   
    })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

const artRouter = require('./routes/artrecord');

app.use('/', artRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})