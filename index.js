const mongoose = require('mongoose');

/**
 * path should come from a config file
 */
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

/**
 * Defining 'layout' of a document
 */
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

/**
 * This is a class
 */
const Course = mongoose.model('Course', courseSchema);

/**
 * Functions
 */
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    /**
     * Save to database
     */
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true})
        .find() // this is same as using (.and([ {}, {} ]))
        // You will get courses published by Mosh or is published
        .or([ { author: 'Mosh' }, { isPublished: true } ]) // each object is a filter
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}


/**
 * Calls
 */
getCourses();