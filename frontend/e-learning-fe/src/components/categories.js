import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";
import Loader from "./loader";
import Navbar from "./navbar";

function Categories() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
      <Navbar />
      <h5 className="p-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Categories
      </h5>

      {isLoading ? (
        <div className="text-center mt-44">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-row w-full flex flex-wrap place-content-center">
          {category.length === 0 ? (
            <p className="text-4xl text-center mt-44 font-semibold">
              No Categories
            </p>
          ) : (
            <>
              {category.map((cat, i) => (
                <div
                  key={i}
                  className="p-6 m-8 w-80 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-700"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
                    {cat.category_name}
                  </h5>

                  <p className="mb-3 font-normal text-white dark:text-white">
                    {cat.description}
                  </p>
                  <Link to="/answer" state={{ categoryId: cat.id }}>
                    <span className="text-center ml-56 w-24 py-2 px-3 text-sm font-medium  text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Start
                    </span>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;
