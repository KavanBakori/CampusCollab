import React from "react";
import Joe from "../Assets/john-doe-image.png"

const Testimonial = () => {
  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase">Testimonials</h2>
        <p className="mt-2 text-5xl font-bold text-gray-800 sm:text-4xl">
          What Our Clients Say
        </p>
        <p className="mt-4 text-lg text-gray-500">
          Discover why our clients love working with us and how we've helped them achieve their goals.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <img
              className="w-24 h-24 rounded-full border-4 border-red-500 shadow-lg"
              src={Joe}
              alt="John Doe"
            />
          </div>
          <blockquote className="text-xl font-medium text-gray-700 mb-6">
            "Working with this team has been an absolute pleasure. Their expertise and dedication have significantly improved our project outcomes."
          </blockquote>
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">John Doe</p>
            <p className="text-sm text-red-600">CEO, TechCorp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;