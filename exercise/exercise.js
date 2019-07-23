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
const courseSchema = mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now},
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});
const Course = mongoose.model('Course', courseSchema);

/**
 * Calls
 */
getCourses();

/**
 * Functions
 */
async function getCourses() {
    const courses = await Course
    .find({ isPublished: true, tags: 'backend'})
    .sort({ name: 1 })
    .select({ name: 1, author: 1});
    console.log(courses);
}
