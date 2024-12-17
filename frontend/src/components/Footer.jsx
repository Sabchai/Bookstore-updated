import React from "react";
import footerLogo from "../assets/footerLogo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = ({ email, setEmail, handleSubscription }) => {
  return (
    <footer className="bg-gray-700 text-white py-8 px-4">
      {/* Main Container */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Navigation */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a href="#home" className="hover:text-orange-500">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-orange-500">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-orange-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-500">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <form onSubmit={(e) => handleSubscription(e, email)} className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-l-md text-black"
              required
            />
            <button
              type="submit"
              className="bg-yellow-900 px-6 py-2 rounded-r-md hover:bg-primary-dark text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-600 pt-6">
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="#privacy" className="hover:text-orange-500">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-orange-500">
              Terms of Service
            </a>
          </li>
        </ul>

        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
