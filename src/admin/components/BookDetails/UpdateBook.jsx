'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import updateBooks from '@/lib/updateBooks';
import { deleteBook } from '@/lib/deleteBook';

function UpdateBook({ book }) {
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  const toggleEdit = () => {
    if (isEditable) {
      // Reset form to initial state when cancelling edit
      setFormData(null);
      setIsUpdating(false);
    }
    setIsEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const newFormData = new FormData(e.target);
    setFormData(newFormData);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setIsUpdating(true); // Disable buttons while processing
      try {
        const { error } = await deleteBook(book.book_id);
        if (!error) {
          router.push('/admin'); // Redirect to /admin after successful deletion
        } else {
          toast.error(error.message);
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
      } finally {
        setIsUpdating(false);
      }
    }
  };
  useEffect(() => {
    const submitData = async () => {
      if (formData) {
        try {
          const response = await updateBooks(formData, book.book_id);
          if (response?.message === 'success') {
            toast.success('Book updated successfully');
            setIsEditable(false); // Disable edit mode on success
          } else {
            toast.error(response?.message);
            // Keep the form active if there's an error
          }
        } catch (error) {
          toast.error(`An error occurred: ${error.message}`);
          // Keep the form active if there's an error
        } finally {
          setIsUpdating(false); // Re-enable buttons after processing
          setFormData(null); // Clear form data
        }
      }
    };

    submitData();
  }, [formData, book.book_id]);

  return (
    <div>
      <ToastContainer />
      <div className='mb-4 flex justify-between'>
        <button
          onClick={toggleEdit}
          disabled={isUpdating}
          className={`px-4 py-2 text-white ${
            isEditable ? 'bg-gray-500' : 'bg-blue-500'
          } rounded-lg`}
        >
          {isEditable ? 'Cancel' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className='rounded-lg bg-red-600 px-4 py-2 text-white'
        >
          Delete Book
        </button>
      </div>

      <form onSubmit={handleSubmit} className='mt-4 space-y-5'>
        {/* Dynamically create form fields based on the book object */}
        {Object.entries({
          title: 'Book Title',
          titleAmharic: 'Title in Amharic',
          author: 'Book Author',
          genre: 'Genre',
          quantity: 'Book Quantity',
          price: 'Price',
          isbn: 'ISBN',
          publisher: 'Publisher',
          publicationDate: 'Publication Date',
          printVersion: 'Print Version',
          language: 'Language',
          synopsis: 'Synopsis',
          synopsisAmharic: 'Synopsis in Amharic',
        }).map(([key, label]) => (
          <div key={key}>
            <label className='font-medium'>{label}</label>
            {key === 'printVersion' ? (
              <select
                name={key}
                defaultValue={book[key]}
                disabled={!isEditable}
                className={`w-full px-3 py-2 ${
                  !isEditable
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-white text-gray-700'
                } rounded-lg border shadow-sm outline-none focus:border-indigo-600`}
              >
                <option value='hardcover'>Hardcover</option>
                <option value='softcover'>Softcover</option>
              </select>
            ) : (
              <input
                type={
                  key === 'quantity' || key === 'price'
                    ? 'number'
                    : key === 'publicationDate'
                      ? 'date'
                      : 'text'
                }
                name={key}
                defaultValue={book[key]}
                disabled={!isEditable}
                className={`w-full px-3 py-2 ${
                  !isEditable
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-white text-gray-700'
                } rounded-lg border shadow-sm outline-none focus:border-indigo-600`}
              />
            )}
          </div>
        ))}

        <button
          type='submit'
          disabled={!isEditable || isUpdating}
          className='w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-700'
        >
          {isUpdating ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
