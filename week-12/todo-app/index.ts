import express from "express";
import userRouter from "./router/userRouter";
import todoRouter from "./router/todoRouter";

const app = express();

app.use(express.json());





app.get('/', (req, res)=>{
    res.status(200).json({message: "hello world"});
});

app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);


const PORT: number = 3000;
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})

