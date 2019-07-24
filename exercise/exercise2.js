/**
 * Dependencies
 */
const mongoose = require('mongoose');

/**
 * Schema
 */
const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now},
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

/**
 * Model
 */
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
    .find()
    .or([{ tags: 'frontend' }, { tags: 'backend' }])
    .and({ isPublished: true })
    .select({ name: 1, author: 1})
    .sort({ price: -1});
}
async function run() {
    const courses = await getCourses();
    console.log(courses);
}

/**
 * Connection
 */
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to server...'));
