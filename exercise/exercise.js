/**
 * Dependencies
 */
const mongoose = require('mongoose');

/**
 * Connection
 */
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to server...'));

/**
 * Schema and Model
 */
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

/**
 * Calls
 */
run();

/**
 * Functions
 */
async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: 'backend'})
    .sort('name') // Asc, '-name' is Desc
    .select('name author'); // show only name and author fields
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}