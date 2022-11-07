import React, { useEffect, useState } from "react";

import API from "../../api";
import Loader from "../loader";
import Navbar from "./navbar";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    await API.users
      .getAdminUsers({
        token,
        username,
      })
      .then((data) => {
        setUsers(data.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-6 bg-gray-300 h-screen cursor-default">
      <Navbar />
      <h5 class="mb-2 mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Admin Users
      </h5>
      {isLoading ? (
        <div class="text-center mt-44">
          <Loader />
        </div>
      ) : (
        <div class="flex flex-col place-items-center mt-2">
          <ul
            class="w-8/12 text-xl font-medium text-gray-900 bg-white rounded-lg border
           border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <div class="flex flex-row">
              <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                Username
              </li>
              <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                First Name
              </li>
              <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                Last Name
              </li>
              <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                Email
              </li>
            </div>
          </ul>
          <ul
            class="w-8/12 text-sm mt-5 font-medium text-gray-900 bg-white rounded-lg border
           border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {users.map((data) => (
              <div class="flex flex-row">
                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  {data.username}
                </li>

                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  {data.firstname}
                </li>

                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  {data.lastname}
                </li>

                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  {data.email}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
