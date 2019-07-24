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
    name: { type: String, required: true}, // built-in validator
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
        // name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    /**
     * Save to database
     */
    try {
        // valdiates the course
        await course.validate();
        // const result = await course.save();
        // console.log(result);
    } 
    catch(err) {
        console.log('Validation failed: ', err.message);
    }
}

async function getCourses() {
    const pageNumber = 2; // assume starts at one
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        .skip((pageNumber -1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .count();
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true});
    console.log(course);
}

async function removeCourse(id) {
    // const result = await Course.deleteMany({ isPublished: true });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

/**
 * Calls
 */
createCourse();