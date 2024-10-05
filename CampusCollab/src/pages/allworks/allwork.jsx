import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sliders, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';

const Allwork = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [projects, setProjects] = useState([]); // State to hold projects
  const navigate = useNavigate();

  const filters = ['All', 'Technology', 'Design', 'Marketing', 'Writing'];

  // Function to fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/fetchallproject'); // Adjust the API endpoint as needed
      const data = await response.json();
      setProjects(data); // Update state with fetched projects
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Call fetchProjects on component mount
  }, []);

  const filteredCards = projects.filter(project =>
    (selectedFilter === 'All' || project.category.toLowerCase() === selectedFilter.toLowerCase()) &&
    project.heading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (project) => {
    navigate('/projectdetails', { state: project });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((isExpanded || showFilters) && !event.target.closest('.search-container')) {
        setIsExpanded(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, showFilters]);

  return (
    <div className="min-h-screen ">
      <br />
      <Navbar />
      <br />
      <div className="w-full p-6 top-0">
        <div className="max-w-4xl mx-auto relative search-container z-1000">
          <div className={`flex items-center bg-white rounded-full transition-all duration-300 ease-in-out ${isExpanded ? 'w-full' : 'w-2/3 mx-auto'} border-2 border-red-500 focus-within:border-black-600`}>
            <Search 
              className="absolute left-4 text-red-500" 
              size={20}
              onClick={() => setIsExpanded(true)}
            />
            <input
              type="text"
              placeholder="Discover your next project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-12 rounded-full focus:outline-none text-lg"
              onFocus={() => setIsExpanded(true)}
            />
            {searchTerm && (
              <X 
                className="absolute right-16 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" 
                size={20}
                onClick={() => setSearchTerm('')}
              />
            )}
            <div 
              className="absolute right-4 bg-gray-900 rounded-full p-2 cursor-pointer hover:bg-red-600 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="text-white" size={20} />
            </div>
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <button
                      key={filter}
                      className={`py-2 px-4 rounded-full transition-colors duration-200 ${
                        selectedFilter === filter
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setSelectedFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-6">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCards.map(project => (
            <motion.div
              style={{ marginTop: '-10px' }}
              key={project.id}
              whileHover={{ y: -5 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(project)}
            >
              <div className="relative">
                <img src={project.thumbnailUrl} alt={project.heading} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                  {/* <Heart className="text-red-500" size={20} /> */}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.heading}</h2>
                <p className="text-gray-600 mb-3">{project.tagline}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className='flex'>
                    <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyb-20ihVRPmRieKEtuyFXoeqp6puC2yuHY7xUFjtCY9ukoNRj7MyQQHKf3Iu5UaGhERM&usqp=CAU" alt={project.accountName} />
                    <span className="ml-2 text-gray-700 font-medium">{project.username}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-500">{project.price}$</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allwork;
