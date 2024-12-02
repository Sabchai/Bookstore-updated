import React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from 'react-router-dom';
import {useDispatch }from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';


const BookCard = ({ book }) => {
    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div className="rounded-lg shadow-lg transition-shadow duration-300 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-82 sm:justify-center gap-4 p-4">
                {/* Book Cover */}
                <div className="sm:h-36 sm:flex-shrink-0 border rounded-md overflow-hidden">                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt={book?.title || "Book Cover"}
                            className="w-full h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
                        />
                    </Link>
                </div>

                {/* Book Details */}
                <div>
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-1">
                            {book?.title || "Book Title"}
                        </h3>
                    </Link>
                    {/* Author Name */}
                    <p className="text-md text-gray-500 mb-3">
                        {book?.author || "Unknown Author"}
                    </p>
                    <p className="text-gray-600 mb-5">
                        {book?.description
                            ? book.description.length > 80
                                ? `${book.description.slice(0, 80)}...`
                                : book.description
                            : "No description available."}
                    </p>
                    <p className="font-medium mb-5">
                        ${book?.newPrice || "0.00"}{" "}
                        <span className="line-through font-normal ml-2">
                            ${book?.oldPrice || "0.00"}
                        </span>
                    </p>
                    <button  onClick={() => handleAddToCart(book)}
                    className="bg-[#ecdb76] p-1 sm:px-4 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
