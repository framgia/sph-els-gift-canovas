import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import API from "../../api";
import Loader from "../loader";
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
    setIsLoading(true);
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
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
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
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black p-2">
        Categories
      </h5>

      {isLoading ? (
        <div className="text-center mt-44">
          <Loader />
        </div>
      ) : (
        <div className="relative lg:mx-auto">
          <div className="w-full flex justify-end">
            <Link to="/admin-add-category">
              <button className="mt-2 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Add Category
                </span>
              </button>
            </Link>
          </div>
          <table className="w-full text-sm text-left text-gray-400 lg:w-3/4 lg:mx-auto md:mx-auto">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Description
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      to="/admin-words-per-category"
                      state={{ data: category }}
                    >
                      {category.category_name}
                    </Link>
                  </th>
                  <td className="py-4 px-6"> {category.description}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-row space-x-3">
                      <Link
                        to="/admin-add-word-choices"
                        state={{ data: category }}
                      >
                        <p className="underline">Add Word</p>
                      </Link>
                      <p className="underline">|</p>
                      <Link
                        to="/admin-edit-category"
                        state={{ data: category }}
                      >
                        <p className="underline">Edit Category</p>
                      </Link>
                      <p className="underline">|</p>
                      <p
                        className="underline cursor-pointer"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete Category
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
