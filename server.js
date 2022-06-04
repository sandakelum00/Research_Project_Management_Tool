const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express();

const postRoutes = require('./routes/posts');

app.use(bodyParser.json()); 
app.use(cors());

app.use(postRoutes);

const PORT = 8000;

const DB_URL = "mongodb+srv://afproject:11225@af-project.ef0riqh.mongodb.net/researchPro?retryWrites=true&w=majority";

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () => {
    console.log('App is running on ${PORT}');
});