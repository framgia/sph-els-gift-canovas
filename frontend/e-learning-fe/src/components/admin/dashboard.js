import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-6">
      <Navbar />
      {isLoading ? (
        ""
      ) : (
        <div class="overflow-x-auto relative p-6">
          <div class="flex flex-row place-content-between">
            <p class="text-4xl font-bold text-gray-900 dark:text-black py-6">
              Categories
            </p>
            <Link to="/adminAddcategory">
              <button class="mt-8 bg-blue-300 hover:bg-blue-500 text-gray-800 font-bold w-40 h-8 rounded inline-flex items-center">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span>Add Category</span>
              </button>
            </Link>
          </div>
          <table class="w-96 text-sm text-left text-black dark:text-black">
            <thead class="text-xs text-black ">
              <tr>
                <th scope="col" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Title
                  </p>
                </th>
                <th scope="row" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Description
                  </p>
                </th>
                <th scope="col" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr>
                  <td class="py-4 px-14">
                    <p class="text-base text-center w-48">
                      {category.category_name}
                    </p>
                  </td>
                  <td class="py-4 px-24">
                    <p class="text-base text-center w-48">
                      {category.description}
                    </p>
                  </td>
                  <td class="py-4 px-28 ">
                    <div class="flex flex-row w-48">
                      <Link
                        to="/adminAddWordChoices"
                        state={{ data: category }}
                      >
                        <a
                          href="#"
                          class="block py-2 pr-4 pl-3 text-black rounded text-lg
                              hover:bg-gray-100 md:hover:bg-blue-200 
                              md:border-0 md:hover:text-blue-700 md:p-0 
                              dark:text-black md:dark:hover:text-blue-600
                              dark:hover:bg-gray-700 dark:hover:text-blue
                              md:dark:hover:bg-transparent"
                        >
                          Add Word |
                        </a>
                      </Link>
                      <Link to="/adminEditCategory" state={{ data: category }}>
                        <a
                          href="#"
                          class="block py-2 pr-4 pl-3 text-black rounded text-lg
                          hover:bg-gray-100 md:hover:bg-blue-200 
                          md:border-0 md:hover:text-blue-700 md:p-0 
                          dark:text-black md:dark:hover:text-blue-600
                          dark:hover:bg-gray-700 dark:hover:text-blue
                          md:dark:hover:bg-transparent"
                        >
                          Edit |
                        </a>
                      </Link>

                      <p
                        class="block py-2 pr-4 pl-3 text-black rounded text-lg
                              hover:bg-gray-100 md:hover:bg-blue-200 
                              md:border-0 md:hover:text-blue-700 md:p-0 
                              dark:text-black md:dark:hover:text-blue-600
                              dark:hover:bg-gray-700 dark:hover:text-blue
                              md:dark:hover:bg-transparent cursor-pointer"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
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
