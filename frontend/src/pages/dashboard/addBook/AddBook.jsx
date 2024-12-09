import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddBookMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {
 
        const newBookData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.")   
        }
      
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-soft-purple via-soft-pink to-soft-peach">
            <div className="max-w-xl mx-auto backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Add New Book
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <InputField
                        label="Title"
                        name="title"
                        placeholder="Enter book title"
                        register={register}
                    />
                    <InputField
                        label="Author" 
                        name="author"
                        placeholder="Enter author name"
                        register={register}
                    />
                    <InputField
                        label="Description"
                        name="description"
                        placeholder="Enter book description"
                        type="textarea"
                        register={register}
                    />
                    <SelectField
                        label="Category"
                        name="category"
                        options={[
                            { value: '', label: 'Choose A Category' },
                            { value: 'novels', label: 'Novels' },
                            { value: 'history', label: 'History' },
                            { value: 'linguistics', label: 'Linguistics' },
                            { value: 'science', label: 'Science' },
                            { value: 'philosophy', label: 'Philosophy' },
                            { value: 'art', label: 'Art' },
                            { value: 'technology', label: 'Technology' },
                        ]}
                        register={register}
                    />
                    <div className="p-4 bg-soft-blue/30 rounded-xl">
                        <label className="inline-flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                {...register('trending')}
                                className="rounded text-purple-500 focus:ring focus:ring-purple-200 focus:ring-offset-0 border-gray-300 transition-all duration-200 ease-in-out"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                                Mark as Trending
                            </span>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Old Price"
                            name="oldPrice"
                            type="number"
                            placeholder="Old Price"
                            register={register}
                        />
                        <InputField
                            label="New Price"
                            name="newPrice"
                            type="number"
                            placeholder="New Price"
                            register={register}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Cover Image
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-soft-purple/20 hover:bg-soft-purple/30 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-purple-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {imageFileName && (
                            <p className="text-sm text-gray-500 italic">
                                Selected: {imageFileName}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </span>
                        ) : (
                            'Add Book'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;