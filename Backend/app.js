const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { User, Projects,Application, connectToDatabase } = require('./db'); // Import User model and connectToDatabase function

const app = express();

// Connect to the database
connectToDatabase();

app.use(cors());
app.use(bodyParser.json());

// Register API endpoint
app.post('/register', async (req, res) => {
    const { username,collegeid, email, phone, password, confirmPassword, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            collegeid,
            email,
            phone,
            password: hashedPassword, // Save the hashed password
            role,
        });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If successful, send a success message (no session or JWT)
        res.json({ message: 'Login successful', user: { email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Add the get route for fetch admin profile
app.get('/fetchadmindetails', async (req, res) => {
    try {
        const users = await User.find({role:"Senior"}); // Fetch all users (admins in this case)
        res.json(users);
    } catch (error) {
        console.error('Error fetching admin details:', error);
        res.status(500).json({ message: 'Failed to fetch admin details', error });
    }
});



// Add the get route for fetch admin and user profile
app.get('/fetchadminuserdetails/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const users = await User.find({email:email}); // Fetch all users (admins in this case)
        res.json(users);
    } catch (error) {
        console.error('Error fetching admin details:', error);
        res.status(500).json({ message: 'Failed to fetch admin details', error });
    }
});


// Add the get route for fetch user profile
app.get('/fetchuserdetails', async (req, res) => {
    try {
        const users = await User.find({role:"Junior"}); // Fetch all users (admins in this case)
        res.json(users);
    } catch (error) {
        console.error('Error fetching admin details:', error);
        res.status(500).json({ message: 'Failed to fetch admin details', error });
    }
});


app.get('/fetchaccountdetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.find({_id:id}); // Fetch all users (admins in this case)
        res.json(users);
    } catch (error) {
        console.error('Error fetching admin details:', error);
        res.status(500).json({ message: 'Failed to fetch admin details', error });
    }
});


// Add the get route for fetch user profile
app.get('/fetchallproject', async (req, res) => {
    try {
        const projects = await Projects.find(); // Fetch all users (admins in this case)
        res.json(projects);
    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).json({ message: 'Failed to fetch project details', error });
    }
});

// Add the PUT route for updating user profile
app.put('/updateprofile/:id', async (req, res) => {
    const { id } = req.params;  // Extract user ID from the request params
    const updatedProfile = req.body;  // The updated profile information is in the request body

    try {
        // Find the user by ID and update their profile
        const updatedUser = await User.findByIdAndUpdate(id, updatedProfile, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated user information as a response
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Failed to update profile. Please try again later.' });
    }
});







// Add the route to handle project submission
app.post('/submitproject', async (req, res) => {
    const { userid,username, heading, tagline, description, price, duration, category,thumbnailUrl } = req.body;    
    try {
        const newProject = new Projects({
            userId: userid,
            username: username,
            heading,
            tagline,
            description,
            price,
            duration,
            category,
            thumbnailUrl,
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error submitting project:', error);
        res.status(500).json({ message: 'Failed to submit project', error });
    }
});



// accept request
app.put('/acceptfreelancer/:projectId', async (req, res) => {
    const { freelancerId } = req.body;  // Get freelancer ID from the request body

    try {
        const updatedProject = await Projects.findByIdAndUpdate(
            req.params.projectId, 
            { 
              freelancer: freelancerId,  // Update the freelancer field
              acceptedAt: new Date()     // Set the acceptedAt field to the current date
            },  
            { new: true }  // Return the updated document
        );
        const updatedfreelancer = await Application.findByIdAndUpdate(
            freelancerId,
            { 
                acceptedAt: new Date()     // Set the acceptedAt field to the current date
            },  
            { new: true }  // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project with freelancer:', error);
        res.status(500).json({ message: 'Failed to update project with freelancer', error });
    }
});



// Assuming you're using Mongoose to connect to your MongoDB database
app.get('/fetchprojectsforadminpage/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;

        // Fetch all projects for the given user
        const projects = await Projects.find({ userId: userid });

        // Return the projects found
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Failed to fetch projects', error });
    }
});




// Assuming you're using Mongoose to connect to your MongoDB database
app.get('/fetchprojectsforuserpage/:projectid', async (req, res) => {
    try {
        const projectid = req.params.projectid;

        // Fetch all projects for the given user
        const projects = await Projects.find({ _id: projectid });

        // Return the projects found
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Failed to fetch projects', error });
    }
});



app.get('/fetchprojectsforselectedpersons/:projectid', async (req, res) => {
    try {
        const projectid = req.params.projectid;

        // Fetch all projects for the given user
        const freelancer = await Application.find({ projectId: projectid });

        // Return the projects found
        res.json(freelancer);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Failed to fetch projects', error });
    }
});




// appy to the project
app.post('/apply', async (req, res) => {
    const { name, email, phone, idNumber, userid, projectid, agreement } = req.body;

    if (!name || !email || !phone || !idNumber || agreement === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newApplication = new Application({
            userId: userid,
            projectId: projectid,
            name,
            email,
            phone,
            idNumber,
            agreement,
        });

        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error saving the application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Add this new route to get all applications
app.get('/fetchapplications/:id', async (req, res) => {
    try {
        // Fetch all applications from the database
        const id = req.params.id;
        const applications = await Application.find({projectId:id});
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Add this new route to get all applications for user profile
app.get('/fetchapplicationsforuserprofilepage/:email', async (req, res) => {
    try {
        // Fetch all applications from the database
        const email = req.params.email;
        const applications = await Application.find({email:email});
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





// Start the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
