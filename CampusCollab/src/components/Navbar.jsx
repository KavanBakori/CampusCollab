import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';  
import axios from 'axios';  
import { HomeIcon, InformationCircleIcon, ChatBubbleLeftRightIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = Cookies.get("username");
    const email = Cookies.get("email");
    setIsLoggedIn(!!username || !!email);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const email = Cookies.get("email"); 
      if (!email) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/fetchadminuserdetails/${email}`);
        if (response.data && response.data.length > 0) {
          setUser(response.data[0]); 
        } else {
          setError('No user data found.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); 

  const handleLogout = () => {
    Cookies.remove("username");
    Cookies.remove("email");
    setIsLoggedIn(false);
    navigate('/');
  };

  const menuOptions = [
    { text: "Home", icon: HomeIcon, href: "/" },
    { text: "About", icon: InformationCircleIcon, href: "/#aboutUS" },
    { text: "Contact", icon: PhoneIcon, href: "/#contactus" },
  ];

  // Conditionally add "Explore" for Junior users
  if (isLoggedIn && user?.role === "Junior") {
    menuOptions.splice(2, 0, { text: "Explore", icon: ChatBubbleLeftRightIcon, href: "/allworks" });
  }

  const NavLink = ({ href, children }) => (
    <Link to={href}>
      <motion.div
        className={`relative px-4 py-2 rounded-full ${location.pathname === href ? 'text-red-600' : 'text-gray-700'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        {location.pathname === href && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
            layoutId="underline"
          />
        )}
      </motion.div>
    </Link>
  );

  const AuthButton = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-700 hover:text-red-600 transition duration-300 ease-in-out"
            onClick={() => {
              user?.role === "Junior" ? navigate('/userprofile') : navigate('/adminprofile');
            }}
          >
            <UserCircleIcon className="h-8 w-8" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition duration-300 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </div>
      );
    } else {
      return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition duration-300 ease-in-out flex items-center space-x-2"
          onClick={() => navigate('/signup')}
        >
          <UserCircleIcon className="h-5 w-5" />
          <span>Login</span>
        </motion.button>
      );
    }
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-red-600 text-4xl font-bold"
              >
                CampusCollab
              </motion.div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {menuOptions.map((item) => (
              <NavLink key={item.text} href={item.href}>
                <div className="flex items-center space-x-1">
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </div>
              </NavLink>
            ))}
            <AuthButton />
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuOptions.map((item) => (
                <Link
                  key={item.text}
                  to={item.href}
                  className="text-gray-700 hover:bg-gray-100 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.text}</span>
                  </div>
                </Link>
              ))}
              <div className="px-3 py-2">
                <AuthButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
