const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');
const secretJWTpassword = "jwt_ur234@dskjf#";

// Admin Routes
router.post('/signup', async(req, res) => {
    const {username, password} = req.body;
    try {
        await Admin.create({username, password});
        res.status(200).json({message: 'Admin created successfully'});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password});
    if(admin){
        const token = jwt.sign({username, password}, secretJWTpassword);
        res.status(200).json(token);
    }else res.status(403).json(null);
});

router.post('/courses', adminMiddleware, async(req, res) => {
    const {title, description, price, imageLink} = req.body;
    try {
        const newCourse = await Course.create({title, description, price, imageLink});
        res.status(200).json({ message: 'Course created successfully', courseId: newCourse?._id });
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    try {
        const allCourses = await Course.find({});
        res.status(200).json(allCourses);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

module.exports = router;