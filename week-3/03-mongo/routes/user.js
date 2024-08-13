const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    const {username, password} = req.body;
    try {
        await User.create({username, password});
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get('/courses', async(req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: "Some thing went wrong"});
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;
    try {
        await User.updateOne({username}, {
            "$push" : {
                purchasedCourses: courseId,
            }
        });
        res.status(200).json({ message: 'Course purchased successfully' });
    } catch (error) {
        res.status(500).json({message: "Some thing went wrong"});
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const username = req.headers.username;
    try {
        const user = await User.findOne({username});
        const allPurchasedCourses = await Course.find({
            _id: {
                "$in" : user.purchasedCourses
            }
        })
        res.json(allPurchasedCourses);
    } catch (error) {
        res.status(500).json({message: "Some thing went wrong"});
    }
});

module.exports = router