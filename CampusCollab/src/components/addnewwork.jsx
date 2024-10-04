import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { X, Upload, DollarSign, Calendar, Tag } from 'lucide-react';

const Addnewwork = ({ isOpen, onClose, userid,username }) => {
  const [formData, setFormData] = useState({
    heading: '',
    tagline: '',
    description: '',
    price: '',
    duration: '',
    category: '',
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTaglineChange = (e) => {
    const { value } = e.target;
    const words = value.split(' ').filter((word) => word !== '');
    if (words.length <= 15) {
      setFormData((prevData) => ({
        ...prevData,
        tagline: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setThumbnail(selectedFile);
    setFileName(selectedFile.name);
  };

  const uploadThumbnail = async () => {
    const data = new FormData();
    data.append('file', thumbnail);
    data.append('upload_preset', 'images_preset');
    try {
      const api = `https://api.cloudinary.com/v1_1/dvy3tlqix/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.heading || !formData.tagline || !formData.description || !formData.price || !formData.duration || !formData.category || !thumbnail) {
      alert("Please fill in all fields and upload an image.");
      setIsLoading(false);
      return;
    }

    try {
      const uploadedThumbnailUrl = await uploadThumbnail();

      const response = await fetch('http://localhost:3001/submitproject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid,
          username,
          ...formData,
          price: Number(formData.price),
          duration: Number(formData.duration),
          thumbnailUrl: uploadedThumbnailUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Project submitted successfully:', data);
      onClose();
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-2xl p-8 relative max-w-2xl w-full"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Project</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">

              {/* Left Column for Text Inputs */}
              <div className="flex-1 flex flex-col space-y-6">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Heading</label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                    placeholder="Enter project heading"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tagline (Max 15 words)</label>
                  <textarea
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleTaglineChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    rows="2"
                    required
                    placeholder="Enter a catchy tagline"
                  />
                  <p className="text-sm text-gray-500 mt-1">Word count: {formData.tagline.split(' ').filter((word) => word !== '').length}/15</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    rows="4"
                    required
                    placeholder="Describe your project in detail"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <div className="relative">
                    <DollarSign className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (in days)</label>
                  <div className="relative">
                    <Calendar className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter duration"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Writing">Writing</option>
                    </select>
                  </div>
                </motion.div>
              </div>

              {/* Right Column for Image Upload */}
              <motion.div whileHover={{ scale: 1.02 }} className="flex-1 flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Thumbnail</label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="custom-file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="text-gray-400 mb-2" size={24} />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                      type="file"
                      name="thumbnail"
                      id="custom-file-upload"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit Project'
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>

  );
};

export default Addnewwork;
