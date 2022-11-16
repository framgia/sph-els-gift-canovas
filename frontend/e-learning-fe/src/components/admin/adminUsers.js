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
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
      <Navbar />
      <h5 className="p-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Admin Users
      </h5>
      {isLoading ? (
        <div className="text-center mt-44">
          <Loader />
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-400 lg:w-3/4 lg:mx-auto md:mx-auto">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                Username
              </th>
              <th scope="col" className="py-3 px-6">
                First Name
              </th>
              <th scope="col" className="py-3 px-6">
                Last Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((data) => (
              <tr
                key={data.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.username}
                </th>
                <td className="py-4 px-6">{data.firstname}</td>
                <td className="py-4 px-6">{data.lastname}</td>
                <td className="py-4 px-6">{data.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminUsers;
