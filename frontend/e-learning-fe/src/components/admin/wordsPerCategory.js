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
  const handleDeleteWord = async (id) => {
    await API.word
      .deleteWord({
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
    <div class="p-6 bg-gray-300 h-screen">
      <Navbar />
      <h5 class="mb-2 mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-black cursor-default">
        Words in Category : {words.category_name}
      </h5>
      {isLoading ? (
        ""
      ) : (
        <div class="flex flex-col place-items-center mt-5">
          <ul
            class="w-full text-xl font-medium text-gray-900 bg-white rounded-lg border
         border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <div class="flex flex-row cursor-default">
              <li class="py-2 px-4 w-6/12 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                Word
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                Correct Answer
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                Choice A
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                Choice B
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                Choice C
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                Choice D
              </li>
              <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                Action
              </li>
            </div>
          </ul>
          <ul
            class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border
         border-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:text-white mt-8"
          >
            {words.words.map((word) => (
              <div class="flex flex-row cursor-default">
                <li class="py-2 px-4 w-6/12 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  {word.word}
                </li>
                <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  {word.correct_answer}
                </li>
                <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  {word.choice_a}
                </li>
                <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  {word.choice_b}
                </li>
                <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  {word.choice_c}
                </li>
                <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  {word.choice_d}
                </li>

                <li class="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  <div class="flex flex-row cursor-pointer">
                    <Link
                      to="/admin-edit-word-and-choices"
                      state={{ data: word }}
                    >
                      <p class="underline">Edit Word |</p>
                    </Link>
                    <p
                      class="underline"
                      onClick={() => handleDeleteWord(word.word_id)}
                    >
                      Delete Word
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

export default AdminWordsPerCategory;
