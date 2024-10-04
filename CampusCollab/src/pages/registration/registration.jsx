import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CheckSquare, Briefcase, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '', // Added phone field
    password: '',
    confirmPassword: '',
    role: '',
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Make sure formData contains all necessary fields
      });
  
      if (!response.ok) {
        throw new Error('Failed to register');
      }
  
      const data = await response.json(); // This will parse the response as JSON
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      alert('Registration failed please try later');
    }
  };
  

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-700 to-red-200 items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-4xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white"
      >
        <div
          className="relative flex-1 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: 'url(https://img.jagranjosh.com/webstories/91818/portrait-beautiful-young-woman-with-laptop-office-generative-ai-932772-9303-1715323324.jpeg)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-8">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-2">Join Our Community</h2>
              <p className="text-lg">Connect, Create, and Collaborate</p>
            </div>
          </div>
        </div>
        <div className="flex-1 p-10 bg-white">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Create Your Account</h3>

          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mb-4 text-green-500">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Phone No.</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
              <div className="relative">
                <CheckSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">I want to</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors appearance-none"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Senior">Assign the work</option>
                  <option value="Junior">Do the work</option>
                </select>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Sign Up
            </motion.button>
          </form>
          <p className="text-gray-600 text-center mt-6">
            Already have an account? <a href="/login" className="text-red-600 hover:underline font-semibold">Log In</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
