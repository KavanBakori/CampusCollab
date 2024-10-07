import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopupForm = ({ isOpen, onClose, userid, projectid }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    agreement: false
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isOpen) return;
      
      try {
        const response = await axios.get('http://localhost:3001/fetchuserdetails');
        if (response.data && response.data.length > 0) {
          const userData = response.data[0];
          setFormData({
            name: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
            idNumber: userData.collegeid || '',
            agreement: false
          });
        } else {
          console.error('No user data found.');
          setSubmissionStatus('error');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setSubmissionStatus('error');
      }
    };

    fetchUser();
  }, [isOpen]);

  const handleAgreementChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      agreement: e.target.checked
    }));
  };

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
      setTimeout(() => onClose(), 2000); // Close the form after 2 seconds
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

        {submissionStatus === 'success' && <p className="text-green-500">Application submitted successfully!</p>}
        {submissionStatus === 'error' && <p className="text-red-500">There was an error. Please try again later.</p>}

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Personal Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              readOnly
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              readOnly
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleAgreementChange}
              id="agreement"
              className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              required
            />
            <label htmlFor="agreement" className="ml-2 text-sm text-gray-700">
              Yes, I will complete this project on or before the deadline.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Submit Application
          </button>
        </form>

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default PopupForm;