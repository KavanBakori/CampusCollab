import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaGithub, FaEdit, FaSave, FaEnvelope, FaPhone, FaPlus } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Addnewwork from '../../components/addnewwork';

const AdminProfile = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]); // Initialize projects state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3001/fetchadmindetails');
                if (response.data && response.data.length > 0) {
                    setUser(response.data[0]); // Assuming we're dealing with the first user
                } else {
                    setError('No user data found.');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Failed to fetch user details. Please try again later.');
                setLoading(false);
            }
        };

        fetchUser();
    }, []); // Fetch user only once when the component mounts

    useEffect(() => {
        const fetchProjects = async (userid) => {
            try {
                const response = await axios.get(`http://localhost:3001/fetchprojectsforadminpage/${userid}`);
                setProjects(response.data); // Set projects data
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Failed to fetch projects. Please try again later.');
            }
        };

        // Fetch projects only if user is available
        if (user) {
            fetchProjects(user._id);
        }
    }, [user]); // Fetch projects when user is available

    const [editedProfile, setEditedProfile] = useState({});

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile({
            description: user.description || '',
            linkedin: user.linkedin || '',
            instagram: user.instagram || '',
            github: user.github || '',
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/updateprofile/${user._id}`, editedProfile);
            setUser({ ...user, ...response.data });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    };

    const handleCardClick = (card, heading) => {
        // Combine both project and projectname in a single state object
        navigate('/allrequests', { state: { project: card, projectname: heading } });
    };


    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>No user data available</div>;

    return (
        <div className="min-h-screen ">
            <Navbar />
            <div className="container mx-auto px-4 py-8 ">
                <div className="rounded-xl  overflow-hidden">
                    <div className="flex" style={{ columnGap: '70px' }}>
                        {/* Left side - Profile Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gradient-to-br from-black to-gray-900 p-8 text-white rounded-2xl shadow-2xl border border-red-600"
                        >
                            <div className="flex flex-col items-center">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    className="w-48 h-48 rounded-full border-4 border-red-600 shadow-2xl mb-6 object-cover"
                                    src={user.profileImage || "https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075253.jpg"}
                                    alt={user.username}
                                />
                                <h1 className="text-4xl font-extrabold mb-2 text-gray-100 bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
                                    {user.username}
                                </h1>
                                <h3 className="text-xl font-semibold text-gray-400 mb-4">ID: {user.collegeid}</h3>

                                <div className="space-y-4 w-full max-w-md">
                                    <motion.div whileHover={{ x: 5 }} className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
                                        <FaEnvelope className="mr-3 text-red-500" />
                                        <span className="text-lg">{user.email}</span>
                                    </motion.div>
                                    <motion.div whileHover={{ x: 5 }} className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
                                        <FaPhone className="mr-3 text-red-500" />
                                        <span className="text-lg">{user.phone}</span>
                                    </motion.div>
                                </div>

                                <div className="flex space-x-6 my-6">
                                    {[
                                        { icon: FaLinkedin, link: user.linkedin },
                                        { icon: FaInstagram, link: user.instagram },
                                        { icon: FaGithub, link: user.github }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            whileHover={{ y: -3 }}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-500 hover:text-red-400 transition-all"
                                        >
                                            <social.icon size={28} />
                                        </motion.a>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={togglePopup}
                                    className="bg-gradient-to-r from-red-700 to-red-500 text-white py-3 px-8 rounded-full font-semibold hover:from-red-800 hover:to-red-600 transition-all duration-300 flex items-center shadow-lg"
                                >
                                    <FaPlus className="mr-2" /> Add New Work
                                </motion.button>
                            </div>
                            <Addnewwork isOpen={isPopupOpen} onClose={togglePopup} userid={user._id} username={user.username} />
                        </motion.div>


                        {/* Right side - Profile Details and Projects */}
                        <div className="md:w-2/3 p-8">
                            <div className="mb-12 text-left">
                                <motion.h2
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="uppercase tracking-wider text-red-600 font-bold text-2xl mb-6 border-b-2 border-red-400 pb-2"
                                >
                                    Profile Information
                                </motion.h2>
                                {isEditing ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-6 bg-white p-8 rounded-xl shadow-2xl"
                                    >
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                            <textarea
                                                name="description"
                                                value={editedProfile.description}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-red-400 focus:outline-none focus:border-red-400 transition-all duration-300 resize-none"
                                                rows="4"
                                            />
                                        </div>
                                        {['linkedin', 'instagram', 'github'].map((field) => (
                                            <div key={field} className="relative">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{field}</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name={field}
                                                        value={editedProfile[field]}
                                                        onChange={handleChange}
                                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-4 focus:ring-red-400 focus:outline-none focus:border-red-400 transition-all duration-300"
                                                    />
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                        {field === 'linkedin' && <FaLinkedin />}
                                                        {field === 'instagram' && <FaInstagram />}
                                                        {field === 'github' && <FaGithub />}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSave}
                                            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 flex items-center justify-center shadow-lg text-lg font-semibold"
                                        >
                                            <FaSave className="mr-2" /> Save Changes
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white p-8 rounded-xl shadow-2xl"
                                    >
                                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">{user.description}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleEdit}
                                            className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-lg text-lg font-semibold"
                                        >
                                            Edit Profile
                                        </motion.button>
                                    </motion.div>
                                )}
                            </div>

                            {/* Projects Section */}
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="uppercase tracking-wider text-red-600 font-bold text-2xl mb-8 border-b-2 border-red-400 pb-2"
                                >
                                    Projects
                                </motion.h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                    {projects.map((card, index) => (
                                        <motion.div
                                            key={card.heading}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                                            className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer"
                                            onClick={() => handleCardClick(card, card.heading)}
                                        >
                                            <div className="relative">
                                                <img src={card.thumbnailUrl} alt={card.heading} className="w-full h-64 object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{card.heading}</h3>
                                            </div>
                                            <div className="p-6">
                                                <p className="text-gray-600 text-lg">{card.tagline}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
