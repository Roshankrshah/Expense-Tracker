require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();
const transcations = require('./routes/transcations');
const connectDB = require('./db/connect');


app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Expense Tracker App Buidling");
});

app.use('/api/v1/transactions', transcations);

const port = process.env.PORT || 2003;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }catch(err){
        console.log(err);
    }
};

start();