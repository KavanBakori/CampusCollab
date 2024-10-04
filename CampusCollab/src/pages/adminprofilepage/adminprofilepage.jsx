import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    const handleCardClick = (card) => {
        // Assuming you want to navigate to the details of the project when clicking on the card
        navigate('/projectdetails', { state: { project: card } });
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>No user data available</div>;

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="md:flex">
                        {/* Left side - Profile Info */}
                        <div className="md:w-1/3 bg-gradient-to-br from-gray-900 to-gray-900 p-8 text-white">
                            <div className="flex flex-col items-center">
                                <img className="w-48 h-48 rounded-full border-4 border-white shadow-lg mb-6" src="https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075253.jpg" alt={user.username} />
                                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                                <div className="flex items-center mb-2">
                                    <FaEnvelope className="mr-2" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center mb-4">
                                    <FaPhone className="mr-2" />
                                    <span>{user.phone}</span>
                                </div>
                                <div className="flex space-x-4 mb-6">
                                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
                                        <FaLinkedin size={24} />
                                    </a>
                                    <a href={user.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
                                        <FaInstagram size={24} />
                                    </a>
                                    <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
                                        <FaGithub size={24} />
                                    </a>
                                </div>
                                <button onClick={togglePopup} className="bg-white text-red-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition duration-300 flex items-center">
                                    <FaPlus className="mr-2" /> Add New Work
                                </button>
                                <Addnewwork isOpen={isPopupOpen} onClose={togglePopup} userid={user._id} username={user.username} />
                            </div>
                        </div>

                        {/* Right side - Profile Details and Projects */}
                        <div className="md:w-2/3 p-8">
                            <div className="mb-8 text-left">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                name="description"
                                                value={editedProfile.description}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                rows="4"
                                            />
                                        </div>
                                        {['linkedin', 'instagram', 'github'].map((field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                                                <input
                                                    type="text"
                                                    name={field}
                                                    value={editedProfile[field]}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>
                                        ))}
                                        <button onClick={handleSave} className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300 flex items-center justify-center">
                                            <FaSave className="mr-2" /> Save Changes
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-gray-600 mb-4">{user.description}</p>
                                        <button onClick={handleEdit} className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300">
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Projects Section */}
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Projects</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {projects.map((card) => (
                                        <div
                                            key={card.heading} // Assuming heading is unique
                                            className="bg-white rounded-lg shadow-md cursor-pointer"
                                            onClick={() => handleCardClick(card)}
                                        >
                                            <img src={card.thumbnailUrl} alt={card.heading} className="w-full h-32 object-cover" />
                                            <div className="p-4">
                                                <h3 className="text-xl font-bold">{card.heading}</h3>
                                                <p className="text-gray-600">{card.tagline}</p>
                                            </div>
                                        </div>
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
