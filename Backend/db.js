const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    collegeid: {
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
    freelancer: String,  // Store the freelancer's ID
    createdAt: {
      type: Date,
      default: Date.now,
    },
    acceptedAt: {
      type: Date,
    },
    thumbnailUrl: String,
});



  const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    projectId: {
        type: String,
    },
    agreement: {
        type: Boolean,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    acceptedAt: {
        type: Date,
    },
});


// Export the User and Authuser models
module.exports = {
    User: mongoose.model('User', userSchema),
    Projects: mongoose.model('Project', projectSchema),
    Application: mongoose.model('Application', applicationSchema),
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
