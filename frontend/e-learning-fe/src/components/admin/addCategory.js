import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import API from "../../api";
import Navbar from "./navbar";

function AdminAddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [isDisableAdd, setIsDisableAdd] = useState(true);

  const token = localStorage.getItem("token");

  const checkFields = () => {
    if (categoryName !== "" && description !== "") setIsDisableAdd(false);
  };

  const handleAddCategory = async () => {
    setIsDisableAdd(true);
    await API.category
      .addCategory({
        category_name: categoryName,
        description,
        token,
      })
      .then(() => {
        toast.success("Successfully Added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setTimeout(() => {
      setIsDisableAdd(false);
    }, 2000);
  };

  return (
    <div class="p-6 bg-gray-300 h-screen">
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
      <p class="text-4xl font-bold text-gray-900 dark:text-black py-6 mt-12">
        Add Categories
      </p>
      <div>
        <label
          for="categoryName"
          class="block mb-2 text-sm font-medium text-black dark:text-black"
        >
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
          onChange={(e) => {
            setCategoryName(e.target.value);
            checkFields();
          }}
        />
      </div>
      <div>
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-black dark:text-black"
        >
          Description
        </label>
        <textarea
          id="message"
          rows="4"
          class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
        border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
        dark:focus:border-blue-500"
          onChange={(e) => {
            setDescription(e.target.value);
            checkFields();
          }}
        ></textarea>
      </div>
      <button
        type="button"
        class={`mt-3 text-white focus:outline-none focus:ring-4 focus:ring-blue-300 
        font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
          isDisableAdd ? "bg-gray-700 " : "bg-blue-700"
        }`}
        onClick={handleAddCategory}
        disabled={isDisableAdd}
      >
        Add
      </button>
    </div>
  );
}

export default AdminAddCategory;
