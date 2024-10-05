import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, differenceInDays, addDays } from 'date-fns';
import { useLocation } from 'react-router-dom';

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
        // Refresh the lists after accepting
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="lg:w-1/4">
          <h2 className="uppercase tracking-wider text-red-500 font-bold text-lg text-center mb-4">Project Actions</h2>
          <div className="space-y-4">
            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full px-4 py-2 text-left rounded-lg ${activeTab === 'requests' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              All Requests
            </button>
            <button
              onClick={() => setActiveTab('selected')}
              className={`w-full px-4 py-2 text-left rounded-lg ${activeTab === 'selected' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              Selected Persons
            </button>
          </div>
        </div>

        <div className="lg:w-2/4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">{projectName}</h1>
        </div>
      </div>

      <div className="mt-12">
        {activeTab === 'requests' && (
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-6">All Requests</h2>
            {requests.length > 0 ? (
              <table className="min-w-full table-auto border-collapse text-center">
                <thead style={{ backgroundColor: 'black', color: 'white' }}>
                  <tr>
                    <th className="border px-4 py-2">Id No.</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Request Date</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id}>
                      <td className="border px-4 py-2">{request.idNumber}</td>
                      <td className="border px-4 py-2">{request.name}</td>
                      <td className="border px-4 py-2 text-blue-500">
                        <a href={`mailto:${request.email}`}>{request.email}</a>
                      </td>
                      <td className="border px-4 py-2">{request.phone}</td>
                      <td className="border px-4 py-2">{formatDate(request.submittedAt)}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleAccept(request._id, request.name)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No requests available for this project.</p>
            )}
          </div>
        )}

        {activeTab === 'selected' && (
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Selected Persons</h2>
            {selectedPersons.length > 0 ? (
              <table className="table-auto w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">ID No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone No.</th>
                    <th className="px-4 py-2">Accepted Date</th>
                    <th className="px-4 py-2">Given Duration (in days)</th>
                    <th className="px-4 py-2">Remaining Days</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPersons.map((person) => (
                    <tr key={person._id} className="bg-gray-100">
                      <td className="border px-4 py-2">{person.idNumber}</td>
                      <td className="border px-4 py-2">{person.name}</td>
                      <td className="border px-4 py-2">{person.email}</td>
                      <td className="border px-4 py-2">{person.phone}</td>
                      <td className="border px-4 py-2">{formatDate(person.acceptedAt)}</td>
                      <td className="border px-4 py-2">{card.duration}</td>
                      <td className="border px-4 py-2">
                        {calculateRemainingDays(person.acceptedAt, card.duration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No users selected for this project.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;