import React from 'react';
import bannerImg from "../../assets/banner.jpeg";

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
      <div className='md:w-1/2 w-full flex items-center md:justify-start'>
        <img 
          src={bannerImg} 
          alt="Banner" 
          className="w-[80%] max-w-[400px] ml-12 object-cover"  
        />
      </div>
      
      <div className='md:w-1/2 w-full pl-4 md:pl-12'> {/* Left padding for text */}
        <h1 className='md:text-3xl text-xl font-medium mb-5'>New Books Out Now</h1>
        <p className='text-m mb-7'>
          Discover the best new book releases and find your next read. Find the latest books that we’ve released this week. 
          If you’re looking for the best new releases, you’ve come to the right place. 
          Our expert booksellers put together this curated collection of the top rated new releases, bestselling new books, 
          and soon-to-be trending titles.
        </p>

        <button className='px-6 py-3 bg-gray-400 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:bg-[#967f4e] hover:scale-105'>
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Banner;
