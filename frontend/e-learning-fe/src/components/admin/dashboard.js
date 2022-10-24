import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";
import Navbar from "./admin/navbar";

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
          <p class="text-4xl font-bold text-gray-900 dark:text-black py-6">
            Categories
          </p>
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
                      <Link to="">
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
                      <Link to="">
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
                      <Link to="">
                        <a
                          href="#"
                          class="block py-2 pr-4 pl-3 text-black rounded text-lg
                              hover:bg-gray-100 md:hover:bg-blue-200 
                              md:border-0 md:hover:text-blue-700 md:p-0 
                              dark:text-black md:dark:hover:text-blue-600
                              dark:hover:bg-gray-700 dark:hover:text-blue
                              md:dark:hover:bg-transparent"
                        >
                          Delete
                        </a>
                      </Link>
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
