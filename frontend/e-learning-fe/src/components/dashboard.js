import React, { useEffect, useState } from "react";

import API from "../api";

function Dashboard() {
  const [category, setCategory] = useState([]);
  const [flag, setFlag] = useState(1);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    await API.category
      .getCategoryByUser({
        username,
        token,
      })
      .then((data) => {
        setFlag(1 + 1);
        setCategory(data.data.categories);
      });
  };

  useEffect(() => {
    fetchData();
  }, [flag]);

  return (
    <div class="p-6">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Categories
      </h5>
      <div class="flex flex-row w-full flex flex-wrap place-content-center">
        {category.map((cat, i) => (
          <div
            key={i}
            class="p-6 m-8 w-80 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-300 dark:border-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
              {cat.category_name}
            </h5>

            <p class="mb-3 font-normal text-black dark:text-gray-600">
              {cat.description}
            </p>
            <a
              href="#"
              class="text-center ml-56 w-24 py-2 px-3 text-sm font-medium  text-white bg-blue-700 
              rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
               dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Start
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
