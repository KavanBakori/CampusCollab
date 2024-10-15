import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, differenceInDays, addDays } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaUserCheck, FaEnvelope, FaPhone, FaCalendar, FaClock } from 'react-icons/fa';

const AllRequests = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);

  const location = useLocation();
  const card = location.state.project;
  const projectName = location.state.projectname;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/fetchapplications/${card._id}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching application requests:', error);
      }
    };

    const fetchSelectedPersons = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/fetchprojectsforselectedpersons/${card._id}`);
        setSelectedPersons(response.data);
      } catch (error) {
        console.error('Error fetching selected persons:', error);
      }
    };

    fetchRequests();
    fetchSelectedPersons();
  }, [card._id]);

  const handleAccept = async (freelancerId, name) => {
    try {
      const response = await axios.put(`http://localhost:3001/acceptfreelancer/${card._id}`, {
        freelancerId: freelancerId,
      });

      if (response.status === 200) {
        alert(`You accepted ${name}'s request and assigned them to the project.`);
        const updatedRequests = requests.filter(request => request._id !== freelancerId);
        setRequests(updatedRequests);
        setSelectedPersons([...selectedPersons, response.data]);
      } else {
        alert('Failed to accept the request.');
      }
    } catch (error) {
      console.error('Error accepting freelancer:', error);
      alert('There was an error accepting the freelancer.');
    }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen  text-white p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-red-500 mb-6 lg:mb-0"
          >
            {projectName}
          </motion.h1>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('requests')}
              className={`flex items-center px-6 py-3 rounded-full ${
                activeTab === 'requests'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              } transition duration-300`}
            >
              <FaUsers className="mr-2" /> All Requests
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('selected')}
              className={`flex items-center px-6 py-3 rounded-full ${
                activeTab === 'selected'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              } transition duration-300`}
            >
              <FaUserCheck className="mr-2" /> Selected Persons
            </motion.button>
          </div>
        </div>

        {activeTab === 'requests' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-red-400">All Requests</h2>
            {requests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-700 text-gray-200">
                      <th className="px-4 py-3 text-left">Id No.</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">Request Date</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <motion.tr
                        key={request._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
                      >
                        <td className="px-4 py-3">{request.idNumber}</td>
                        <td className="px-4 py-3">{request.name}</td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${request.email}`} className="text-blue-400 hover:text-blue-300">
                            <FaEnvelope className="inline mr-2" />{request.email}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <FaPhone className="inline mr-2" />{request.phone}
                        </td>
                        <td className="px-4 py-3">
                          <FaCalendar className="inline mr-2" />{formatDate(request.submittedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAccept(request._id, request.name)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
                          >
                            Accept
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-400">No requests available for this project.</p>
            )}
          </motion.div>
        )}

        {activeTab === 'selected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-red-400">Selected Persons</h2>
            {selectedPersons.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-700 text-gray-200">
                      <th className="px-4 py-3 text-left">ID No.</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Phone No.</th>
                      <th className="px-4 py-3 text-left">Accepted Date</th>
                      <th className="px-4 py-3 text-left">Given Duration</th>
                      <th className="px-4 py-3 text-left">Remaining Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPersons.map((person, index) => (
                      <motion.tr
                        key={person._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
                      >
                        <td className="px-4 py-3">{person.idNumber}</td>
                        <td className="px-4 py-3">{person.name}</td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${person.email}`} className="text-blue-400 hover:text-blue-300">
                            <FaEnvelope className="inline mr-2" />{person.email}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <FaPhone className="inline mr-2" />{person.phone}
                        </td>
                        <td className="px-4 py-3">
                          <FaCalendar className="inline mr-2" />{formatDate(person.acceptedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <FaClock className="inline mr-2" />{card.duration} days
                        </td>
                        <td className="px-4 py-3">
                          {calculateRemainingDays(person.acceptedAt, card.duration)} days
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-400">No users selected for this project.</p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AllRequests;