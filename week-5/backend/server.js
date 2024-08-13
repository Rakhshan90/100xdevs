const express = require('express');
const dotenv = require('dotenv');
const todoRouter = require('./router/todoRouter');
const dbConnect = require('./config/dbConnect');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();
app.use(express.json());
dotenv.config();
dbConnect();
app.use(cors());

// create todo
app.use('/todo', todoRouter);







app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})