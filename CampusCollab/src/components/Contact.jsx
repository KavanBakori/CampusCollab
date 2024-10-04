import React from "react";
import { Send, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="relative overflow-hidden  py-24 px-4 sm:px-6 lg:px-8" id="contactus">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] bg-center" />
      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase">Get in Touch</h2>
        <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Have a Question?
        </p>
        <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
          We're here to help. Let us know how we can assist you.
        </p>
        <form className="mt-12 sm:flex sm:justify-center" onSubmit={(e) => e.preventDefault()}>
          <div className="relative rounded-full w-full sm:max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="block w-full bg-white border border-gray-300 rounded-full py-3 pl-10 pr-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition duration-300 ease-in-out"
            />
            <button
              type="submit"
              className="mt-3 sm:mt-0 sm:ml-3 sm:absolute sm:right-0 sm:top-0 sm:bottom-0 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:scale-105"
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