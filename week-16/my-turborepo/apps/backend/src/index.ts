import express from 'express';
import {VALUE} from '@repo/common/config';

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("express app started");
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
    console.log(VALUE);
});