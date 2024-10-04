import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Accountdetails = () => {
    const location = useLocation();
    const { userid } = location.state;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/fetchaccountdetails/${userid}`);
                if (response.data && response.data.length > 0) {
                    setUser(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, [userid]);

    if (!user) {
        return <div>Loading...</div>; // Loading state
    }

    const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyb-20ihVRPmRieKEtuyFXoeqp6puC2yuHY7xUFjtCY9ukoNRj7MyQQHKf3Iu5UaGhERM&usqp=CAU"; // Replace with actual profile picture if available

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="md:flex">
                    <div className="md:flex-shrink-0 bg-gradient-to-br from-gray-900 to-gray-900 p-8 text-white">
                        <div className="text-center">
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-6" 
                                src={profilePic} 
                                alt={user.username} 
                            />
                            <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                        </div>
                        <div className="space-y-4">
                            <p className="flex items-center text-lg">
                                <FaEnvelope className="mr-3 text-red-500" /> 
                                {user.email}
                            </p>
                            <p className="flex items-center text-lg">
                                <FaPhone className="mr-3 text-red-500" /> 
                                {user.phone}
                            </p>
                        </div>
                        <div className="mt-8 flex justify-center space-x-4">
                            <motion.a whileHover={{ scale: 1.1 }} href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-gray-200 text-2xl"><FaLinkedin /></motion.a>
                            <motion.a whileHover={{ scale: 1.1 }} href={user.instagram} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-gray-200 text-2xl"><FaInstagram /></motion.a>
                            <motion.a whileHover={{ scale: 1.1 }} href={user.github} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-gray-200 text-2xl"><FaGithub /></motion.a>
                        </div>
                    </div>
                    <div className="p-8 md:p-12 md:flex-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Me</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">{user.description}</p>
                        {/* <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-red-700 transition-colors duration-300"
                        >
                            View my profile
                        </motion.button> */}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Accountdetails;
