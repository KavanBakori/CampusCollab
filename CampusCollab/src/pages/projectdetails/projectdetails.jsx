import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, MapPin, DollarSign, User, Briefcase, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PopupForm from '../../components/appynowform';

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleApplyNowClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  // Utility function to format date to DD/MM/YYYY
const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};


  const [viewAll, setViewAll] = useState(false);

  const projectRequirements = [
    'User authentication',
    'Real-time chat functionality',
    'Payment gateway integration',
    'Responsive design',
    'Admin dashboard with analytics',
  ];

  const projectImages = [
    'https://miro.medium.com/v2/resize:fit:1200/0*M4bxiCIjcTK-2Xr6.jpeg',
    'https://www.buttercup.in/case-studies/wp-content/uploads/2019/02/logo-design-1.jpg',
    'https://cdn.prod.website-files.com/6410ebf8e483b5bb2c86eb27/6410ebf8e483b5758186fbd8_ABM%20college%20mobile%20app%20dev%20main.jpg',
    'https://miro.medium.com/v2/resize:fit:1400/0*4DpFVUP_VfkhzSIL',
    'https://www.blogtyrant.com/wp-content/uploads/2019/07/draft-a-post.jpg',
  ];

  const displayedImages = viewAll ? projectImages : projectImages.slice(0, 4);

  const handleAccountClick = () => {
    navigate('/accountdetails', {
      state: {
        userid: card.userId,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <br />
      <div className="flex">
        {/* Left side - Large Image */}
        <div className="w-1/2 relative ">
          <img className=" w-full " style={{height:'78vh'}} src={card.thumbnailUrl} alt={card.heading} />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white text-center px-8">{card.heading}</h1>
          </div>
        </div>

        {/* Right side - Project Details */}
        <div className="w-1/2 overflow-y-auto">
          <div className="p-12">
            <div className="mb-8">
              <div className="uppercase tracking-wider text-red-500 font-bold text-lg text-center mb-4">Project Details</div>
              <p className="text-xl text-gray-600 leading-relaxed">{card.tagline}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <DetailItem icon={Clock} label="Duration" value={card.duration} />
              {/* <DetailItem icon={MapPin} label="Location" value={card.location} /> */}
              <DetailItem icon={DollarSign} label="Budget" value={card.price} />
              <DetailItem icon={User} label="Client" value={card.username} />
              <DetailItem icon={Briefcase} label="Category" value={card.category} />
              <DetailItem icon={Calendar} label="Posted Date" value={formatDate(card.createdAt)} />
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center cursor-pointer" onClick={handleAccountClick}>
                  <img className="h-16 w-16 rounded-full object-cover border-2 border-red-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyb-20ihVRPmRieKEtuyFXoeqp6puC2yuHY7xUFjtCY9ukoNRj7MyQQHKf3Iu5UaGhERM&usqp=CAU" alt={card.accountName} />
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-900">{card.username}</div>
                    <div className="text-sm text-gray-900 hover:underline">View Profile</div>
                  </div>
                </div>
                <button
                  onClick={handleApplyNowClick}
                  className="bg-gray-900 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  Apply Now
                </button>
                {/* Pop-up Form */}
                <PopupForm isOpen={isPopupOpen} onClose={closePopup} userid={card.userId} projectid={card._id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Requirements and Images */}
      <div className="flex flex-col md:flex-row p-8 bg-gradient-to-r justify-center from-gray-50 via-white to-gray-50  shadow-2xl rounded-lg">
        {/* Left Side: Project Description and Requirements */}
        <div className="text-center pr-6">
          <h2 className="uppercase tracking-wider text-red-500 font-bold text-lg text-center mb-4">
            Project Overview
          </h2>
          <p className="mb-6 text-gray-700 leading-relaxed">{card.description}</p>
          {/* <ul className="list-disc list-inside text-gray-800 font-medium space-y-3">
            {projectRequirements.map((requirement, index) => (
              <li key={index} className="hover:text-red-500 transition-colors duration-300">
                {requirement}
              </li>
            ))}
          </ul> */}
        </div>

        {/* Right Side: Project Images */}
        {/* <div className="md:w-1/3 mt-6 md:mt-0">
          <h3 className="uppercase tracking-wider text-red-500 font-bold text-lg text-center mb-4">
            Reference Images
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Project Image ${index + 1}`}
                className="w-full h-36 object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
          {projectImages.length > 4 && (
            <button
              onClick={() => setViewAll(!viewAll)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {viewAll ? 'Show Less' : 'View All'}
            </button>
          )}
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center bg-gray-50 p-4 rounded-lg">
    <Icon className="h-6 w-6 text-red-500 mr-3" />
    <div>
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  </div>
);

export default ProjectDetails;
