const func = require('joi/lib/types/func');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}


async function addAuthors(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

addAuthors('65fd2c3bcda55ffd6c98bdca', new Author({ name: 'Haris' }));



async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'John' })
// ]);
