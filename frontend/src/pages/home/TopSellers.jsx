import React, { useState } from 'react'; 
import BookCard from "../../pages/books/BookCard"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../redux/features/favorites/favoritesSlice";

const categories = [
  "Choose a genre", 
  'novels', 
  'history', 
  'linguistics', 
  'science', 
  'philosophy', 
  'art', 
  'technology'
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [] } = useFetchAllBooksQuery();
  const dispatch = useDispatch();

  const filteredBooks = selectedCategory === "Choose a genre" 
    ? books 
    : books.filter(book => book.category === selectedCategory.toLowerCase());

  const handleAddToFavorites = (book) => {
    dispatch(addFavorite(book));
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start space-y-6 mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 to-gray-800">
            Top Sellers
          </h2>
          <div className="relative">
            <select
              name="category"
              id="category"
              className="appearance-none bg-white border-gray-400 rounded-full shadow-xl transition-all duration-200 hover:shadow-md text-black font-medium py-3 px-4 text-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category} className="py-2">
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 40 },
              1024: { slidesPerView: 2, spaceBetween: 50 },
              1180: { slidesPerView: 3, spaceBetween: 50 },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper !pb-12 !px-4"
          >
            {filteredBooks.length > 0 &&
              filteredBooks.map((book, index) => (
                <SwiperSlide key={index} className="p-4">
                  <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-xl bg-white shadow-lg overflow-hidden flex flex-col">
                    <BookCard book={book} />
                    <button
                      onClick={() => handleAddToFavorites(book)}
                      className="w-full py-2 mt-2 bg-yellow-900 text-white rounded-lg hover:bg-slate-500 transition-all"
                    >
                      Add to Favorites
                    </button>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopSellers;
