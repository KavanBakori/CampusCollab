import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: "kavan2269@gmail.com", // Your email where form submissions will be sent
      from_email: email,
      from_name: name,
      message: message,
    };

    emailjs.send(
      "service_ye8dcwn",  // Replace with your EmailJS service ID
      "template_nkjrq5n",  // Replace with your EmailJS template ID
      templateParams,
      "ajo1ulgU4OAxWjb2_"  // Replace with your EmailJS user ID
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        // Reset form fields after successful submission
        setEmail("");
        setName("");
        setMessage("");
      }, (err) => {
        console.log("FAILED...", err);
      });
  };

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
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Contact <span className="text-red-600">Us</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We would love to hear from you! Please reach out with any questions, suggestions, or feedback.
          </p>
        </motion.div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaPhoneAlt className="text-red-600 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaEnvelope className="text-red-600 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">info@example.com</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <FaMapMarkerAlt className="text-red-600 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600">123 Main St, Anytown, USA</p>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 md:col-span-2"
              rows="4"
              value={message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white font-semibold rounded-lg py-3 md:col-span-2 transition duration-300 hover:bg-red-700 focus:outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
