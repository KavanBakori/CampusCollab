import React from "react";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h1 style={{display:'flex',justifyContent:'left'}} className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-500">
              CampusCollab
            </h1>
            <p className="text-gray-400 max-w-xs">
              Connecting students, fostering collaboration, and building a stronger campus community.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: BsTwitter, href: "https://twitter.com" },
                { icon: SiLinkedin, href: "https://linkedin.com" },
                { icon: BsYoutube, href: "https://youtube.com" },
                { icon: FaFacebookF, href: "https://facebook.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2  className="text-xl font-semibold mb-4">Quick Links</h2>
            {["Home", "About Us", "Services", "Contact Us"].map((link, index) => (
              <a
                key={index}
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="space-y-4">
            <h2 style={{display:'flex',justifyContent:'left'}} className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              7016729656
            </p>
            <p className="flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              kavanbakori111@gmail.com
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 CampusCollab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;