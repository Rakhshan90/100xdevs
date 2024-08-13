const mongoose = require('mongoose');


const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connection established");
    } catch (error) {
        throw new Error(`Database connection failed ${error}`);
    }
}

module.exports = dbConnect;