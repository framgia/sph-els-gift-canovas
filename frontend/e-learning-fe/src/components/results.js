import React, { useEffect, useState } from "react";

import API from "../api";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const token = localStorage.getItem("token");
  let quiz_taken_id = 52; // TODO: static id for now

  const fetchData = async () => {
    await API.results
      .getResults({
        quiz_taken_id,
        token,
      })
      .then((data) => {
        setResults(data.data);
        setIsloading(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div class="overflow-x-auto relative p-6">
          <table class="w-96 text-sm text-left text-black dark:text-black">
            <thead class="text-xs text-black uppercase ">
              <tr>
                <th scope="col" class="py-3 px-6"></th>
                <th scope="col" class="py-3 px-6">
                  Word
                </th>
                <th scope="col" class="py-3 px-6">
                  Answer
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((data) => (
                <tr>
                  <td class="py-4 px-6">
                    {data.is_correct === true ? (
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    ) : (
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
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    )}
                  </td>
                  <td class="py-4 px-6">{data.word}</td>
                  <td class="py-4 px-6">{data.user_answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Results;
