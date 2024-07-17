const express = require("express");
const mongoose = require('mongoose');

const path = require('path')
const cookieParser = require('cookie-parser')

const character = require('./backend/chineseChardict.api.cjs')
const hexagram= require('./backend/hexagram.api.cjs')


const app = express();

const mongoDBEndpoint = 'mongodb+srv://cs5610:webdev@firstcluster.u1o1hyw.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster'
mongoose.connect(mongoDBEndpoint, {
    dbName: "Yijing",
    useNewUrlParser: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/character', character);
app.use('/api/hexagram', hexagram);

let frontend_dir = path.join(__dirname, 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(process.env.PORT || 8000, function(){
    console.log("deep dark fantasy");
});