const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    const {username, password} = req.body;
    try {
        await Admin.create({username, password});
        res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
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
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: "Some thing went wrong"});
    }
});

module.exports = router;