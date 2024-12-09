import React, { useState, useEffect } from 'react'
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageBooks = () => {
    const navigate = useNavigate();

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    const { data: books, refetch } = useFetchAllBooksQuery()

    const [deleteBook] = useDeleteBookMutation()

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`dashboard/edit-book/${id}`);
    };

    // Update filtered books when books or search query change
    useEffect(() => {
        if (books) {
            const filtered = books.filter(book => 
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                book.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [books, searchQuery]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <section className="py-1 bg-gradient-to-br from-pastel-blue/20 to-pastel-purple/20">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white/90 w-full mb-6 shadow-2xl rounded-xl">
                    <div className="rounded-t mb-0 px-4 py-3 border-b border-pastel-purple/30">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-lg text-pastel-purple">
                                    All Books
                                </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                {/* Search Input */}
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search books..."
                                    className="p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-gradient-to-br from-pastel-blue/10 to-pastel-purple/10 text-pastel-purple align-middle border-b border-pastel-purple/20 py-3 text-sm uppercase whitespace-nowrap font-semibold text-left">
                                        #
                                    </th>
                                    <th className="px-6 bg-gradient-to-br from-pastel-blue/10 to-pastel-purple/10 text-pastel-purple align-middle border-b border-pastel-purple/20 py-3 text-sm uppercase whitespace-nowrap font-semibold text-left">
                                        Book Title
                                    </th>
                                    <th className="px-6 bg-gradient-to-br from-pastel-blue/10 to-pastel-purple/10 text-pastel-purple align-middle border-b border-pastel-purple/20 py-3 text-sm uppercase whitespace-nowrap font-semibold text-left">
                                        Category
                                    </th>
                                    <th className="px-6 bg-gradient-to-br from-pastel-blue/10 to-pastel-purple/10 text-pastel-purple align-middle border-b border-pastel-purple/20 py-3 text-sm uppercase whitespace-nowrap font-semibold text-left">
                                        Price
                                    </th>
                                    <th className="px-6 bg-gradient-to-br from-pastel-blue/10 to-pastel-purple/10 text-pastel-purple align-middle border-b border-pastel-purple/20 py-3 text-sm uppercase whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredBooks.length > 0 ? (
                                    filteredBooks.map((book, index) => (
                                        <tr key={index} className="hover:bg-pastel-purple/10 transition-all duration-200">
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-pastel-purple">
                                                {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                {book.title}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                <span className="bg-pastel-yellow/30 text-pastel-yellow py-1 px-3 rounded-full font-medium">
                                                    {book.category}
                                                </span>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-pastel-green font-semibold">
                                                ${book.newPrice}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 space-x-4">
                                                <Link
                                                    to={`/dashboard/edit-book/${book._id}`}
                                                    className="font-medium bg-amber-600 from-pastel-blue to-pastel-green text-black px-3 py-1 rounded-lg shadow-md transition-all duration-300 hover:bg-pastel-blue/80 transform hover:scale-105 hover:-translate-y-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="font-medium bg-red-700 from-pastel-pink to-pastel-red text-white  px-3 py-1 rounded-lg shadow-md transition-all duration-300 hover:bg-pastel-pink/80 transform hover:scale-105 hover:-translate-y-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-pastel-purple">
                                            No books found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ManageBooks;
