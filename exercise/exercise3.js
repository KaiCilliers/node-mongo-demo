/**
 * Dependencies
 */
const mongoose = require('mongoose');

/**
 * Schema
 */
const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
});

/**
 * Model
 */
const Course = mongoose.model('Course', courseSchema);

/**
 * Connection
 */
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to server...'));

/**
 * Calls
 */
run();

/**
 * Functions
 */
async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([  
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .sort('-price')
        .select('name author price');
}
async function run() {
    const courses = await getCourses();
    console.log(courses);
}