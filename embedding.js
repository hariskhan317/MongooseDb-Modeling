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
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}


async function updateAuthor(id) {
  // using findById
  // const course = await Course.findById(id)
  // course.author.name = "Haris"
  // course.save();
  // console.log('done')

  // using update methode
  const course = await Course.updateOne({ _id: id }, {
    $set: {
      'author.name': 'Mosh'
    }
  })

}



async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

updateAuthor('65fd1a14a2a69b6493fbeedd');

// createCourse('Node Course', new Author({ name: 'Mosh' }));
