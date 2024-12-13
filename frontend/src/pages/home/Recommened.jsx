import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { useDispatch } from 'react-redux';  // Import useDispatch
import { addFavorite } from "../../redux/features/favorites/favoritesSlice";

const Recommended = () => {
  const dispatch = useDispatch();  // Initialize dispatch hook
  const { data: books = [] } = useFetchAllBooksQuery();

  const handleAddToFavorites = (book) => {
    dispatch(addFavorite(book));  // Dispatch the addFavorite action
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Sección de "Recommended for you" */}
        <div className="flex flex-col items-start space-y-6 mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 to-gray-800">
            Recommended for You
          </h2>
        </div>

        {/* Swiper de libros */}
        <div className="relative">
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
              1180: {
                slidesPerView: 3,
                spaceBetween: 50,
              }
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper !pb-12 !px-4"
          >
            {/* Mapea los libros recomendados */}
            {books.length > 0 && books.slice(12, 20).map((book, index) => (
              <SwiperSlide key={index} className="p-4">
                {/* Carta del libro con espaciado y margen adecuados */}
                <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-xl bg-white shadow-lg overflow-hidden flex flex-col">
                  <BookCard book={book} />
                  <button
                    onClick={() => handleAddToFavorites(book)}  // Call the handler
                     className="w-full py-2 mt-2 bg-yellow-900 text-white rounded-lg hover:bg-slate-500 transition-all"
                  >
                    Add to Favorites
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom gradient overlays for a fading effect */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Recommended;
