require('dotenv').config();

const PORT = process.env.PORT || 5000;

const path = require('path');
const db = require('./db');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const router = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(express.json());


app.use('/api', router);

const start = async () => {
    try {
        await db.authenticate();
        await db.sync();
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();