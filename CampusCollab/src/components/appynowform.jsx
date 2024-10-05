import React, { useState } from 'react';
import axios from 'axios'; // Import Axios to make HTTP requests

const PopupForm = ({ isOpen, onClose, userid, projectid }) => {
  // Manage form data with state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    agreement: false,
  });

  // Manage form submission status
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/apply', {
        ...formData,
        userid,
        projectid
      });
      setSubmissionStatus('success');
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error submitting form:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-8 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Apply for Project</h2>

        {/* Show success or error message */}
        {submissionStatus === 'success' && <p className="text-green-500">Application submitted successfully!</p>}
        {submissionStatus === 'error' && <p className="text-red-500">There was an error submitting the form.</p>}

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Personal Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your ID number"
              required
            />
          </div>

          {/* Agreement */}
          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              id="agreement"
              className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              required
            />
            <label htmlFor="agreement" className="ml-2 text-sm text-gray-700">
              Yes, I will complete this project on or before the deadline.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Submit Application
          </button>
        </form>

        {/* Close "X" Button on the top right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default PopupForm;
