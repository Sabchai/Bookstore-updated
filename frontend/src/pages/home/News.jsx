import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import news1 from "../../assets/news/news1.jpg";
import news2 from "../../assets/news/news2.jpg";
import news3 from "../../assets/news/news3.jpg";
import news4 from "../../assets/news/news4.jpg";

const news = [
  {
    "id": 1,
    "title": "Sidereus Nuncius: Why Spain’s National Library Covered Up the Theft of a Galileo Original Work",
    "description": "Spain’s National Library concealed the theft of an original work by Galileo, a valuable piece of scientific history. The investigation into the theft has sparked a wider debate on the preservation of cultural and historical artifacts in Spain.",
    "image": news1
  },
  {
    "id": 2,
    "title": "Francis Drake’s Lost Fleet Emerges in Northwestern Spain",
    "description": "A significant archaeological discovery has been made in the northwest of Spain, revealing the remnants of Francis Drake’s lost fleet. This discovery sheds light on Spain’s rich maritime history and its cultural ties to global exploration.",
    "image": news2
  },
  {
    "id": 3,
    "title": "Robert Capa’s Iconic Image of Shell-Damaged Houses Helps Tenants Start a New Life",
    "description": "An iconic photograph by Robert Capa from the Spanish Civil War, showcasing shell-damaged houses, is helping tenants and families reconnect with the country’s complex history, as well as the resilience of Spain’s people during the post-war period.",
    "image": news3
  },
  {
    "id": 4,
    "title": "The Drowning of Spain’s Villages: A Cultural and Environmental Crisis",
    "description": "The destruction and submersion of historical villages in Spain due to damming projects is raising concerns about the loss of Spain’s cultural heritage. The submerged towns are now a focal point for both environmentalists and historians seeking to preserve the past.",
    "image": news4
  }
];

const News = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col items-start space-y-6 mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 to-gray-800">
            Latest News
          </h2>
        </div>

        {/* Swiper for news articles */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper !pb-12 !px-4"
        >
          {news.map((item, index) => (
            <SwiperSlide key={index}>
              {/* News Item Layout */}
              <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-12 p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                {/* Text Content */}
                <div className="flex flex-col sm:w-2/3">
                  <Link to="/" className="text-lg font-medium hover:text-blue-500 mb-4">
                    {item.title}
                  </Link>
                  <div className="w-12 h-[4px] bg-primary mb-5"></div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 sm:w-1/3">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default News;
