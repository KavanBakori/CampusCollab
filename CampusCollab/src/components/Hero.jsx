import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BannerImage from "../Assets/workingG.jpg";
import Navbar from "./Navbar";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
    {/* <Navbar/> */}
    <div className="min-h-screen w-full  ">
      {/* Navbar placeholder */}
      
      <div className="container mx-auto px-4 pt-20 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Bridge the Gap,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">
                Earn the Experience
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg" style={{margin:'auto'}}>
              Empowering juniors to gain real-world experience by collaborating with senior students on impactful projects.
            </p>
            <br />
            {/* <motion.button 
            style={{margin:'auto '}}
              className="group flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold rounded-full transition duration-300 hover:shadow-lg hover:from-red-700 hover:to-pink-700"
              onClick={() => navigate('allworks')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find work 
              <FiArrowRight className="ml-3 text-xl transition-transform duration-300 group-hover:translate-x-2" />
            </motion.button> */}
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg transform rotate-3 scale-105"
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              <motion.img 
                src={BannerImage}
                alt="Collaborative Work"
                className="relative z-10 w-full rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-20 h-20 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </div>
    </>
  );
};

export default Hero;