import React from "react";
import { motion } from "framer-motion";
import { BsFillPlayCircleFill } from "react-icons/bs";

import AboutBackgroundImage from "../Assets/working.jpg";

const About = () => {
  return (
    <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden" id="aboutUS">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.img 
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[600px]"
                src={AboutBackgroundImage}
                alt="About Campus Collab"
               
              />
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 flex flex-col justify-center items-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p 
              className="text-red-600 font-bold text-lg mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              About Us
            </motion.p>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Empowering Tomorrow's<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">
                Leaders Today
              </span>
            </motion.h1>
            <motion.p 
          
              className="text-gray-400 text-left text-lg mb-8 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Campus Collab connects junior students with senior projects, providing a platform for hands-on experience, skill development, and collaborative learning in a real-world setting. Join us to bridge the gap between learning and doing, and start your journey towards professional growth.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-red-600 text-white py-3 px-8 rounded-full font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Learn More
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-800 py-3 px-8 rounded-full font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <BsFillPlayCircleFill className="text-2xl text-red-600" /> Watch Video
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0 0,1 0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-current text-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default About;