import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Feedback() {
  return (
    <div className="w-full mt-4 flex items-center justify-center">
      <section
        id="feedback"
        className="px-8 py-16 bg-[#232F3E] text-white w-full"
      >
        <h2 className="text-4xl font-bold mb-8 text-center">
          We Value Your Feedback
        </h2>

        <p className="text-center mb-8 text-gray-400 max-w-2xl mx-auto">
          Help us improve by sharing your thoughts! Your feedback is important
          to us, and we will use it to better our services.
        </p>

        <form className="w-auto h-auto mx-auto p-4 max-w-[1200px]">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Share your feedback..."
              className="w-full px-4 py-2 md:text-lg bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Submit Feedback
          </button>
        </form>

        <div className="flex justify-center mt-12 space-x-6 w-full">
          <a
            href="https://www.facebook.com/profile.php?id=61566375895055"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-500 transition duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-400 transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-pink-500 transition duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-600 transition duration-300"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Feedback;
