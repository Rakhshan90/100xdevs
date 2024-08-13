const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken');
const secretJWTpassword = "jwt_ur234@dskjf#";

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;
    try {
        await User.create({username, password});
        res.status(200).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const admin = await User.findOne({username, password});
    if(admin){
        const token = jwt.sign({username, password}, secretJWTpassword);
        res.status(200).json(token);
    }else res.status(403).json(null);
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    try {
        const allCourses = await Course.find({});
        res.status(200).json(allCourses);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.username;
    try {
        await User.updateOne({username}, {
            "$push" : {purchasedCourses: courseId}
        });
        res.status(200).json({ message: 'Course purchased successfully' });
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const username = req.username;
    try {
        const user = await User.findOne({username});
        const allPurchasedCourses = await Course.find({
            _id: {
                "$in" : user.purchasedCourses
            }
        });
        res.json(allPurchasedCourses);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

module.exports = router