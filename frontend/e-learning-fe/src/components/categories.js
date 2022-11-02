import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";
import Navbar from "./navbar";

function Categories() {
  const [category, setCategory] = useState([]);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    await API.category
      .getCategoryByUser({
        username,
        token,
      })
      .then((data) => {
        setCategory(data.data.categories);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-6 bg-gray-300 h-screen">
      <Navbar />
      <h5 class="mb-2 mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Categories
      </h5>
      <div class="flex flex-row w-full flex flex-wrap place-content-center">
        {category.map((cat, i) => (
          <div
            key={i}
            class="p-6 m-8 w-80 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
              {cat.category_name}
            </h5>

            <p class="mb-3 font-normal text-white dark:text-white">
              {cat.description}
            </p>
            <Link to="/answer" state={{ categoryId: cat.id }}>
              <a
                class="text-center ml-56 w-24 py-2 px-3 text-sm font-medium  text-white bg-blue-700 
              rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
               dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Start
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
