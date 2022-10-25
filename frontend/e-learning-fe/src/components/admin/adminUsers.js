import React, { useEffect, useState } from "react";

import API from "../../api";
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
    <div class="p-6">
      <Navbar />
      {isLoading ? (
        ""
      ) : (
        <div class="overflow-x-auto relative p-6">
          <p class="text-4xl font-bold text-gray-900 dark:text-black py-6">
            Admin User List
          </p>
          <table class="w-96 text-sm text-left text-black dark:text-black">
            <thead class="text-xs text-black ">
              <tr>
                <th scope="col" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Username
                  </p>
                </th>
                <th scope="row" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    First Name
                  </p>
                </th>
                <th scope="col" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Last Name
                  </p>
                </th>
                <th scope="col" class="w-48">
                  <p class="text-base text-center text-gray-900 dark:text-black">
                    Email
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((data) => (
                <tr>
                  <td class="py-4 px-14">
                    <p class="text-base text-gray-900 dark:text-black cursor-pointer">
                      {data.username}
                    </p>
                  </td>
                  <td class="py-4 px-14">
                    <p class="text-base text-gray-900 dark:text-black cursor-pointer">
                      {data.firstname}
                    </p>
                  </td>
                  <td class="py-4 px-14">
                    <p class="text-base text-gray-900 dark:text-black cursor-pointer">
                      {data.lastname}
                    </p>
                  </td>
                  <td class="py-4 px-14">
                    <p class="text-base text-gray-900 dark:text-black cursor-pointer">
                      {data.email}
                    </p>
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

export default AdminUsers;
