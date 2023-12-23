"use client";

import { addBooks } from "@/app/server-actions/addBooks";
import { Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";


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
          if (response?.message === "success") {
            toast.success("Book added successfully");
          } else {
            toast.error(response?.message);
          }
        } catch (error) {
          toast.error("An error occurred");
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
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <main className="w-full flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600">
          <div className="text-center pb-8">
            <div className="mt-5">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Add Book Details
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Book Title</label>
              <input
                type="text"
                name="title"
                // required
                placeholder="Enter Title"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Title in Amharic</label>
              <input
                type="text"
                name="titleAmharic"
                placeholder="አማርኛ ርዕስ ያስገቡ"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Book Author</label>
              <input
                type="text"
                name="author"
                placeholder="Enter Author Name"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Genre</label>
              <input
                type="text"
                name="genre"
                placeholder="Enter Genre"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Book Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter Quantity"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">ISBN</label>
              <input
                type="number"
                name="isbn"
                placeholder="Enter ISBN"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Publisher</label>
              <input
                type="text"
                name="publisher"
                placeholder="Enter Publisher"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Publication Date</label>
              <input
                type="date"
                name="publicationDate"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Print Version</label>
              <Select label="Select Print Version" name="printVersion">
                <SelectItem key="hardcover" value="hardcover">
                  Hardcover
                </SelectItem>
                <SelectItem key="softcover" value="softcover">
                  Softcover
                </SelectItem>
              </Select>
            </div>

            <div>
              <label className="font-medium">Language</label>
              <input
                type="text"
                name="language"
                placeholder="Enter Language"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Synopsis</label>
              <textarea
                name="synopsis"
                placeholder="Enter Synopsis"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg h-24"
              />
            </div>

            <div>
              <label className="font-medium">Synopsis in Amharic</label>
              <textarea
                name="synopsisAmharic"
                placeholder="እጭር መግለጫ"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg h-24"
              />
            </div>

            <div>
              <label className="font-medium">Upload Cover Page</label>
              <input
                type="file"
                name="file"
                placeholder="Upload cover page"
                accept="image/jpeg, image/png, image/gif"
                multiple="multiple"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mb-10 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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
