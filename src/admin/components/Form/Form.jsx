'use client';

import { addBooks } from '@/app/hooks/addBooks';
import { Select, SelectItem } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const AddBooksForm = () => {
  // State to hold formData
  const [formData, setFormData] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData(e.target);
    setFormData(newFormData);
  };

  // Effect to handle the async operation
  useEffect(() => {
    const submitData = async () => {
      if (formData) {
        try {
          const response = await addBooks(formData);
          if (response?.message === 'success') {
            toast.success('Book added successfully');
          } else {
            toast.error(response?.message);
          }
        } catch (error) {
          toast.error('An error occurred');
        }

        // Reset formData state
        setFormData(null);
      }
    };

    submitData();
  }, [formData]);

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
      <main className='flex w-full flex-col items-center justify-center px-4'>
        <div className='w-full max-w-sm text-gray-600'>
          <div className='pb-8 text-center'>
            <div className='mt-5'>
              <h3 className='text-2xl font-bold text-gray-800 sm:text-3xl'>
                Add Book Details
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='font-medium'>Book Title</label>
              <input
                type='text'
                name='title'
                // required
                placeholder='Enter Title'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Title in Amharic</label>
              <input
                type='text'
                name='titleAmharic'
                placeholder='አማርኛ ርዕስ ያስገቡ'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Book Author</label>
              <input
                type='text'
                name='author'
                placeholder='Enter Author Name'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Genre</label>
              <input
                type='text'
                name='genre'
                placeholder='Enter Genre'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Book Quantity</label>
              <input
                type='number'
                name='quantity'
                placeholder='Enter Quantity'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Price</label>
              <input
                type='number'
                name='price'
                placeholder='Enter Price'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>ISBN</label>
              <input
                type='number'
                name='isbn'
                placeholder='Enter ISBN'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Publisher</label>
              <input
                type='text'
                name='publisher'
                placeholder='Enter Publisher'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Publication Date</label>
              <input
                type='date'
                name='publicationDate'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Print Version</label>
              <Select label='Select Print Version' name='printVersion'>
                <SelectItem key='hardcover' value='hardcover'>
                  Hardcover
                </SelectItem>
                <SelectItem key='softcover' value='softcover'>
                  Softcover
                </SelectItem>
              </Select>
            </div>

            <div>
              <label className='font-medium'>Language</label>
              <input
                type='text'
                name='language'
                placeholder='Enter Language'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Synopsis</label>
              <textarea
                name='synopsis'
                placeholder='Enter Synopsis'
                className='h-24 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Synopsis in Amharic</label>
              <textarea
                name='synopsisAmharic'
                placeholder='እጭር መግለጫ'
                className='h-24 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <div>
              <label className='font-medium'>Upload Cover Page</label>
              <input
                type='file'
                name='file'
                placeholder='Upload cover page'
                accept='image/jpeg, image/png, image/gif'
                multiple='multiple'
                className='w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>

            <button
              type='submit'
              className='mb-10 w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600'
            >
              Add Details
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddBooksForm;
