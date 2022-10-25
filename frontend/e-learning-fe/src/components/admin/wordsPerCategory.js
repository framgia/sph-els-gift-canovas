import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import API from "../../api";
import Navbar from "./navbar";

function AdminWordsPerCategory() {
  const location = useLocation();
  const { data } = location.state;
  const { id } = data;
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    await API.word
      .getWordsPerCategory({
        token,
        id,
      })
      .then((data) => {
        setWords(data.data);
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
            Words In this Category {words.category_name}
          </p>

          <table class="w-96 text-sm text-left text-black dark:text-black">
            <thead class="text-xs text-black ">
              <tr>
                <th scope="col" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Word
                  </p>
                </th>
                <th scope="row" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Correct Answer
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
              {words.words.map((word) => (
                <tr>
                  <td class="py-4 px-14">
                    <p class="text-base text-center w-48">{word.word}</p>
                  </td>
                  <td class="py-4 px-24">
                    <p class="text-base text-center w-48">
                      {word.correct_answer}
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

export default AdminWordsPerCategory;
