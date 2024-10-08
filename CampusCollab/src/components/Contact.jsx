import React, { useState } from "react";
import { Send, Mail } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: "kavan2269@gmail.com", // Your email where form submissions will be sent
      from_email: email,
      message: message,
    };

    emailjs.send(
      "service_ye8dcwn",  // Replace with your EmailJS service ID
      "template_pugw7xi",  // Replace with your EmailJS template ID
      templateParams,
      "ajo1ulgU4OAxWjb2_"  // Replace with your EmailJS user ID
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      }, (err) => {
        console.log("FAILED...", err);
      });

    setEmail("");
    setMessage("");
  };

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8" id="contactus" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="relative max-w-3xl mx-auto text-center bg-white shadow-lg rounded-lg p-10" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase">Get in Touch</h2>
        <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Have a Question?
        </p>
        <p className="mt-5 text-xl text-gray-500">
          We're here to help. Let us know how we can assist you.
        </p>

        <form className="mt-10 sm:flex sm:justify-center" onSubmit={sendEmail}>
          <div className="relative rounded-lg w-full sm:max-w-xl">
              <input
                type="text"
                placeholder="Enter your name"
                className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pl-3 pr-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition duration-300 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            <textarea
              placeholder="Enter your message"
              className="block w-full mt-4 bg-gray-50 border border-gray-300 rounded-lg py-3 pl-3 pr-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition duration-300 ease-in-out"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
              <Send className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
