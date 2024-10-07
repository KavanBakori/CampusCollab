import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaEdit, FaSave, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { format, differenceInDays, addDays } from 'date-fns';


const Userprofile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({});
    const [applications, setApplications] = useState({}); // Change from object to array
    const [editedProfile, setEditedProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [projects, setProjects] = useState([]);


    const handleAccountClick = (userId) => {
        navigate('/accountdetails', {
            state: {
                userid: userId,
            }
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3001/fetchuserdetails');
                if (response.data && response.data.length > 0) {
                    setUser(response.data[0]); // Assuming we're dealing with the first user
                } else {
                    setError('No user data found.');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Failed to fetch user details. Please try again later.');
            } finally {
                setLoading(false); // Ensure loading is false in finally
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user.email) { // Ensure email is available before fetching applications
            const fetchApplications = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/fetchapplicationsforuserprofilepage/${user.email}`);
                    if (response.data) {
                        setApplications(response.data); // Set applications directly
                    } else {
                        setError('No applications found.');
                    }
                } catch (error) {
                    console.error('Error fetching applications:', error);
                    setError('Failed to fetch applications. Please try again later.');
                }
            };

            fetchApplications();
        }
    }, [user]);

    useEffect(() => {
        if (applications.length > 0) { // Ensure applications are available before fetching projects
            const fetchProjects = async () => {
                try {
                    const projectIds = applications.map(app => app.projectId); // Extract project IDs
                    const response = await Promise.all(
                        projectIds.map(projectId => axios.get(`http://localhost:3001/fetchprojectsforuserpage/${projectId}`))
                    );
                    const projectsData = response.map(res => res.data).flat(); // Flatten the response
                    setProjects(projectsData); // Set projects data
                } catch (error) {
                    console.error('Error fetching projects:', error);
                    setError('Failed to fetch projects. Please try again later.');
                }
            };

            fetchProjects();
        }
    }, [applications]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/updateprofile/${user._id}`, editedProfile);
            setUser(response.data); // Update user state with the saved details
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const handleChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    };

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const calculateRemainingDays = (acceptedDate, durationDays) => {
        const currentDate = new Date();
        const accepted = new Date(acceptedDate);
        const dueDate = addDays(accepted, durationDays);
        return differenceInDays(dueDate, currentDate);
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="container mx-auto p-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Profile Section */}
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                                <img
                                    className="rounded-full h-32 w-32 mx-auto mb-4 border-4 border-red-600"
                                    src={'https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075253.jpg'}
                                    alt={user.username}
                                />
                                <div className="text-center space-y-2">
                                    <h1 className="text-4xl font-bold">{user.username}</h1>
                                    <h1 className="text-2xl font-bold text-red-500">Id : {user.collegeid}</h1>
                                    <p>
                                        <FaEnvelope className="inline-block mr-2" /> {user.email}
                                    </p>
                                    <p>
                                        <FaPhone className="inline-block mr-2" /> {user.phone}
                                    </p>
                                    {isEditing ? (
                                        <textarea
                                            name="description"
                                            value={editedProfile.description || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 bg-gray-700 rounded"
                                            placeholder="Enter your description"
                                        />
                                    ) : (
                                        <p>{user.description}</p>
                                    )}
                                </div>

                                {/* Editable Social Links */}
                                {isEditing ? (
                                    <div className="mt-6 space-y-4">
                                        <input
                                            className="w-full p-2 bg-gray-700 rounded"
                                            name="linkedin"
                                            value={editedProfile.linkedin || ''}
                                            onChange={handleChange}
                                            placeholder="LinkedIn Profile"
                                        />
                                        <input
                                            className="w-full p-2 bg-gray-700 rounded"
                                            name="instagram"
                                            value={editedProfile.instagram || ''}
                                            onChange={handleChange}
                                            placeholder="Instagram Profile"
                                        />
                                        <input
                                            className="w-full p-2 bg-gray-700 rounded"
                                            name="github"
                                            value={editedProfile.github || ''}
                                            onChange={handleChange}
                                            placeholder="GitHub Profile"
                                        />
                                        <button
                                            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleSave}
                                        >
                                            <FaSave className="inline-block mr-2" /> Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4 mt-4">
                                        <div className="flex justify-center space-x-4">
                                            <a
                                                href={user.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <FaLinkedin size={24} />
                                            </a>
                                            <a
                                                href={user.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <FaInstagram size={24} />
                                            </a>
                                            <a
                                                href={user.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <FaGithub size={24} />
                                            </a>
                                        </div>
                                        <button
                                            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
                                            onClick={handleEdit}
                                        >
                                            <FaEdit className="inline-block mr-2" /> Edit details
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Project Section */}
                            <div className="bg-gray-900 p-10 rounded-xl shadow-2xl">
                                <h2 className="text-4xl font-extrabold mb-8 text-white border-b-2 border-red-500 pb-4">
                                    Selected Projects
                                </h2>
                                <div className="space-y-8">
                                    {projects.length > 0 ? (
                                        projects.map((project) => (
                                            <div key={project._id} className="bg-gray-800 p-8 rounded-lg shadow-lg flex hover:shadow-2xl transition-shadow duration-300" style={{ columnGap: '20px' }}>
                                                {/* Left Section with Image & User */}
                                                <div className="flex w-full flex-col">
                                                    <img
                                                        src={project.thumbnailUrl}
                                                        alt={project.title}
                                                        className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity duration-300"
                                                    />
                                                    <div className="flex items-center rounded-lg mt-4 bg-gradient-to-r from-gray-700 to-gray-800 p-4 hover:bg-gray-700 cursor-pointer transition-colors duration-300" onClick={() => handleAccountClick(project.userId)}>
                                                        <img
                                                            className="h-16 w-16 rounded-full object-cover border-4 border-red-500"
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyb-20ihVRPmRieKEtuyFXoeqp6puC2yuHY7xUFjtCY9ukoNRj7MyQQHKf3Iu5UaGhERM&usqp=CAU"
                                                            alt={project.name}
                                                        />
                                                        <div className="ml-4">
                                                            <div className="text-lg font-semibold text-white">{project.username}</div>
                                                            <div className="text-sm text-gray-400 hover:underline">View Profile</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Section with Project Details */}
                                                <div className="flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-red-400 mb-2">{project.heading}</h3>
                                                        <p className="text-gray-300 mb-4">{project.tagline}</p>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-4">
                                                        <span className="text-2xl text-gray-100 ">${project.price}</span>

                                                        {/* Project Status */}
                                                        <div className="text-right">
                                                            {project.acceptedAt ? (
                                                                <>
                                                                    <span className="block text-gray-200">Accepted: {formatDate(project.acceptedAt)}</span>
                                                                    <span className="block text-red-400">Days Remaining: {calculateRemainingDays(project.acceptedAt, project.duration)}</span>
                                                                    {applications.some(app => app._id === project.freelancer) ? (
                                                                        <span className="block text-green-500 font-bold">Request Accepted</span>
                                                                    ) : (
                                                                        <span className="block text-yellow-500 font-bold">Request Pending</span>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <span className="text-yellow-500 font-bold">Request Pending</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-gray-400 mb-4">No projects available.</p>
                                            <motion.div>
                                                <motion.button
                                                    className="group flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition duration-300 shadow-lg"
                                                    onClick={() => navigate("/allworks")}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    View Projects
                                                </motion.button>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Userprofile;
