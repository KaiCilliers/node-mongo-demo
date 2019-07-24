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
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
        // match: /pattern/
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'], // has to be one of the values
        required: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            // sometimes validation logic might involve reading something from a DB or remote service
            validator: function(v, callback) {
                // Do some async work then when result is ready call callback()
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        // arrow function does not work here. They don't have 'this'
        required: function() { return this.isPublished; }, // If isPublished, then price is required
        min: 10,
        max: 500
    }
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
        // No built in validator to require at least one tag
        tags: null,
        isPublished: true,
        price: 25,
        category: 'web'
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