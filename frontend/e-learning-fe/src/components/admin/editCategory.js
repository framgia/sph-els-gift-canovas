import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import API from "../../api";
import Navbar from "./navbar";

function AdminEditCategory() {
  const location = useLocation();
  const { data } = location.state;
  const {
    id,
    category_name: propcategoryName,
    description: propdescription,
  } = data;
  const [categoryName, setCategoryName] = useState(propcategoryName);
  const [description, setDescription] = useState(propdescription);

  const token = localStorage.getItem("token");

  const handleEditCategory = async () => {
    await API.category
      .editCategory({
        id,
        category_name: categoryName,
        description,
        token,
      })
      .then(() => {
        toast.success("Edit Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="bg-gray-300 h-screen cursor-default">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <div className="p-6">
        <p className="text-4xl font-bold text-gray-900 dark:text-black">
          Edit Category Details
        </p>
        <div>
          <label
            htmlFor="categoryName"
            className="block mb-2 text-sm font-medium text-black dark:text-black mt-3"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
            onChange={(e) => setCategoryName(e.target.value)}
            defaultValue={categoryName}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-black dark:text-black"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
              border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
          ></textarea>
        </div>
        <button
          type="button"
          className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 
            focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-2.5 text-center mr-2 mb-2 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleEditCategory}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default AdminEditCategory;
