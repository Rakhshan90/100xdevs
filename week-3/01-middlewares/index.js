const express = require('express');
const zod = require('zod');

const app = express();

app.use(express.json());

const schema = zod.array(zod.number());
const authSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (username != 'rakhshan' || password != 'pass') {
        res.status(400).json({ msg: "You are not allowed" });
    }else next();
}

function kidneyMiddleware(req, res, next) {
    const kidneyId = req.query.kidneyId;
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(400).json({ msg: "You are not allowed" });
    }
    next();
}

app.get('/health-checkup', userMiddleware, kidneyMiddleware, (req, res) => {
    res.json({ msg: "You are allowed" });
})

app.post('/health-checkup', (req, res)=>{
    const kidneys = req.body.kidneys;
    // const kisneysLength = kidneys.length;
    // res.send(`You have ${kisneysLength} kidneys`);
    const response = schema.safeParse(kidneys);
    if(!response.success){
        res.status(401).json({msg: "Invalid input"});
    }
    else res.json(response);
})

app.post('/signup', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password
    const response = authSchema.safeParse({email, password});
    // res.json(response);
    if(!response.success) res.status(401).json({msg: "Invalid input"});
    else res.json(response.success);
})

// Global caches or error handler middleware
app.use((err, req, res, next)=>{
    res.status(500).json({msg: "Something went wrong"});
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});