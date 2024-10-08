import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Users, Target, Lightbulb, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "Sakshi Ajagiya",
    image: "https://i.ibb.co/XXq5z2v/sakshi.jpg",
    linkedin: "https://www.linkedin.com/in/sakshi-ajagiya-107811233/",
    github: "https://github.com/sakshiajagiya",
    bio: "Quality Assurance: Anticipating challenges to ensure flawless user experiences."
  },
  {
    name: "Kavan Bakori",
    image: "https://i.ibb.co/stxF3Tr/kavan.jpg",
    linkedin: "https://www.linkedin.com/in/kavan-bakori/",
    github: "https://github.com/KavanBakori",
    bio: "Driving Innovation: Passionate about building seamless products that solve real-world problems."
  },
  {
    name: "Aman Garala",
    image: "https://avatars.githubusercontent.com/u/103805887?v=4",
    linkedin: "https://www.linkedin.com/in/aman-garala/",
    github: "https://github.com/Amangarala",
    bio: "Component Architect: Crafting essential elements for a successful project framework."
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-red-600 relative">
                Us
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h1>
          </motion.div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a dynamic team dedicated to bridging the gap between juniors and seniors,
            providing real-world experiences, and building impactful projects that matter.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mb-24 text-center bg-white rounded-2xl shadow-xl p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -5 }}
        >
          <Target className="w-16 h-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            To empower juniors by creating opportunities for them to collaborate on projects with
            seniors and learn through real-world experience.
          </p>
        </motion.div>

        {/* Team Section */}
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex space-x-4">
                  <motion.a
                    href={member.linkedin}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={24} />
                  </motion.a>
                  <motion.a
                    href={member.github}
                    className="text-gray-900 hover:text-gray-700 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    aria-label="GitHub"
                  >
                    <FaGithub size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          className="py-24 bg-gray-50 rounded-3xl mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
            {[
              {
                icon: Users,
                title: "Collaboration",
                description: "Working together to achieve common goals and create meaningful impact."
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "Constantly seeking new and creative solutions to solve challenges."
              },
              {
                icon: ArrowUpRight,
                title: "Growth",
                description: "Fostering an environment where both juniors and seniors can grow."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <value.icon className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;