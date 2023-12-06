const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

const postRoute = require("./routes/post");

dotenv.config()


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected to the db")).catch((err) => { console.log(err) });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/posts", postRoute);

app.listen(process.env.PORT || 4000, () => console.log(`Example app listening on port ${process.env.PORT}!`));
