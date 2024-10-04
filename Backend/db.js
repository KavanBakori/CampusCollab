const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
    },
    description: {
        type: String,
    },
    github: {
        type: String,
    },
    instagram: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    projects: [
        {
          heading: String,
          tagline: String,
          description: String,
          price: Number,
          duration: Number,
          category: String,
          createdAt: {
            type: Date,
            default: Date.now, // Set default value for createdAt
          },
        },
      ],

});


const projectSchema = new mongoose.Schema({
    heading: String,
    tagline: String,
    description: String,
    price: Number,
    duration: Number,
    category: String,
    userId: String,
    username: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thumbnailUrl:String,
  });


// Export the User and Authuser models
module.exports = {
    User: mongoose.model('User', userSchema),
    Projects: mongoose.model('Project', projectSchema),
    connectToDatabase: async () => {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/Campuscollab', {

            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    },
};
