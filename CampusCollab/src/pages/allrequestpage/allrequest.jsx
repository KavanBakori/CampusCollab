import React, { useState } from 'react';

const Allrequests = () => {
  const [activeTab, setActiveTab] = useState('requests'); // To toggle between tabs

  const requests = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '345-678-9012' },
  ];

  const selectedPersons = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  const handleAccept = (id) => {
    alert(`Accepted request with ID: ${id}`);
    // You can add logic to mark the user as accepted in your actual app
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Container */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        
        {/* Left Side: Toggle Buttons */}
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

        {/* Center: Project Title */}
        <div className="lg:w-2/4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Build Dynamic Platform</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-12">
        {/* All Requests Section */}
        {activeTab === 'requests' && (
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-6">All Requests</h2>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Phone</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="border px-4 py-2">{request.name}</td>
                    <td className="border px-4 py-2">{request.email}</td>
                    <td className="border px-4 py-2">{request.phone}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Accept
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Selected Persons Section */}
        {activeTab === 'selected' && (
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Selected Persons</h2>
            <ul className="space-y-4">
              {selectedPersons.map((person) => (
                <li key={person.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  {person.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allrequests;
