
import React, { useEffect } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [UpdateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
      setValue('author', bookData.author); // Set the author field
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
      author: data.author, 
    };

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: 'Book Updated',
        text: 'Your book is updated successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, It's Okay!",
      });
      await refetch();
    } catch (error) {
      alert('Failed to update book.');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-soft-purple via-soft-pink to-soft-peach">
      <div className="max-w-xl mx-auto backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Update Book
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
            placeholder="Enter author's name"
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
            <InputField
              label="Cover Image URL"
              name="coverImage"
              type="text"
              placeholder="Cover Image URL"
              register={register}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateBook;