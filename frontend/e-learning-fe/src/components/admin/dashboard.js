import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import API from "../../api";
import Navbar from "./navbar";

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    await API.category
      .getCategories({
        token,
      })
      .then((data) => {
        setCategories(data.data);
        setIsLoading(false);
      });
  };

  const handleDeleteCategory = async (id) => {
    await API.category
      .deleteCategory({
        token,
        id,
      })
      .then(() => {
        toast.success("Successfully Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <div class="flex flex-row justify-around">
        <h5 class="mb-2 mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-black cursor-default">
          Categories
        </h5>
        <Link to="/admin-add-category">
          <button class="mt-12 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add Category
            </span>
          </button>
        </Link>
      </div>

      {isLoading ? (
        ""
      ) : (
        <div class="flex flex-col place-items-center mt-2">
          <ul
            class="w-8/12 text-xl font-medium text-gray-900 bg-white rounded-lg border
           border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <div class="flex flex-row">
              <li class="py-2 px-4 w-3/4 rounded-t-lg border-b border-gray-200 dark:border-gray-600 cursor-default">
                Title
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600 cursor-default">
                Description
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600 cursor-default">
                Action
              </li>
            </div>
          </ul>
          <ul
            class="w-8/12 text-sm font-medium text-gray-900 bg-white rounded-lg border
           border-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:text-white mt-8"
          >
            {categories.map((category) => (
              <div class="flex flex-row">
                <Link to="/admin-words-per-category" state={{ data: category }}>
                  <li class="mr-16 py-2 px-4 w-64 rounded-t-lg border-b border-gray-200 dark:border-gray-600 cursor-pointer">
                    {category.category_name}
                  </li>
                </Link>

                <li class="ml-3 mr-24 py-2 px-4 w-64 rounded-t-lg border-b border-gray-200 dark:border-gray-600 cursor-default">
                  {category.description}
                </li>

                <li class="py-2 px-4 w-96 rounded-t-lg border-b border-gray-200 dark:border-gray-600 cursor-pointer">
                  <div class="flex flex-row">
                    <Link
                      to="/admin-add-word-choices"
                      state={{ data: category }}
                    >
                      <p class="underline">Add Word |</p>
                    </Link>
                    <Link to="/admin-edit-category" state={{ data: category }}>
                      <p class="underline">Edit Category |</p>
                    </Link>
                    <p
                      class="underline"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Delete Category
                    </p>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
