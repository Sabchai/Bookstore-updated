import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (isLoading) return <div className="text-center text-xl text-gray-500">Loading...</div>
    if (isError) return <div className="text-center text-xl text-red-500">Error loading book info</div>

    return (
        <div className="max-w-lg shadow-xl rounded-lg bg-gradient-to-r from-red-100 via-yellow-100 to-orange-200 p-6 space-y-6">
            <h1 className="text-3xl font-semibold text-brown-700 mb-4">{book.title}</h1>

            <div className="flex flex-col items-center">
                <img
                    src={`${getImgUrl(book.coverImage)}`}
                    alt={book.title}
                    className="w-3/4 h-auto object-cover rounded-lg shadow-lg mb-6 cursor-pointer"
                    onClick={() => window.location.href = `/book/${id}`} // Navigate to detailed view on image click
                />
            </div>

            <div className="text-gray-600 space-y-4">
                <p className="text-lg"><strong>Author:</strong> {book.author || 'admin'}</p>
                <p className="text-lg text-gray-600"><strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}</p>
                <p className="text-lg text-gray-600 capitalize"><strong>Category:</strong> {book?.category}</p>
                <p className="text-lg text-gray-600 leading-relaxed">
                    <strong>Description:</strong> {book.description}
                </p>
            </div>

            <button
                onClick={() => handleAddToCart(book)}
                className="w-full flex items-center justify-center px-6 py-3 bg-yellow-900 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 space-x-2"
            >
                <FiShoppingCart className="text-lg" />
                <span>Add to Cart</span>
            </button>
        </div>
    )
}

export default SingleBook;