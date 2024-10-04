import React from "react";
import { motion } from "framer-motion";
import { UserPlusIcon, MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline";

const Work = () => {
  const workInfoData = [
    {
      icon: UserPlusIcon,
      title: "Sign Up and Create Your Profile",
      text: "Join the platform, set up your profile, and showcase your skills and interests",
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Browse and Apply for Projects",
      text: "Explore a variety of projects posted by senior students and apply to the ones that match your expertise",
    },
    {
      icon: UsersIcon,
      title: "Collaborate and Grow",
      text: "Work on projects, gain practical experience, receive feedback, and build your portfolio for future opportunities",
    },
  ];
  
  return (
    <div className="work-section-wrapper py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 bg-grid-opacity-50"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto relative z-10"
      >
        <div className="work-section-top text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-red-600 text-lg font-semibold mb-2"
          >
            Work Process
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-bold text-gray-800 mb-6"
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">Works</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-xl max-w-3xl mx-auto"
          >
            Unlock your potential by collaborating on real projects with senior students. Here's how Campus Collab helps you get started:
          </motion.p>
        </div>
        <div className="work-section-bottom grid grid-cols-1 md:grid-cols-3 gap-8">
          {workInfoData.map((data, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 4) }}
              className="work-section-info p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              key={data.title}
            >
              <div className="info-boxes-img-container mb-6 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white"
                >
                  <data.icon className="w-10 h-10" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.title}</h2>
              <p className="text-gray-600 text-lg">{data.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
        <svg className="relative block w-full h-36" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current text-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default Work;