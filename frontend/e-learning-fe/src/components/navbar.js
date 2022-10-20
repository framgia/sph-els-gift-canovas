import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-500 mb-5">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="flex flex-col p-4 mt-4
           bg-gray-50 rounded-lg border
            border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm 
            md:font-medium md:border-0 md:bg-white dark:bg-gray-500
             md:dark:bg-gray-500 dark:border-gray-400"
          >
            <li>
              <Link to="/dashboard">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-black rounded text-lg
                  hover:bg-gray-100 md:hover:bg-transparent 
                  md:border-0 md:hover:text-blue-700 md:p-0 
                  dark:text-black md:dark:hover:text-white 
                  dark:hover:bg-gray-700 dark:hover:text-white 
                  md:dark:hover:bg-transparent"
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
<<<<<<< HEAD
              <Link to="/profile">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-black rounded text-lg
=======
              <Link to="/categories">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-black rounded text-lg
                  hover:bg-gray-100 md:hover:bg-transparent 
                  md:border-0 md:hover:text-blue-700 md:p-0 
                  dark:text-black md:dark:hover:text-white 
                  dark:hover:bg-gray-700 dark:hover:text-white 
                  md:dark:hover:bg-transparent"
                >
                  Categories
                </a>
              </Link>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 text-black rounded text-lg
>>>>>>> a3f6553 ([SELS-34] [FE/BE] Dashboard User Activity Log)
                hover:bg-gray-100 md:hover:bg-transparent
                 md:border-0 md:hover:text-blue-700 md:p-0 
                 dark:text-black md:dark:hover:text-white
                  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-black rounded text-lg
                  hover:bg-gray-100 md:hover:bg-transparent md:border-0
                   md:hover:text-blue-700 md:p-0 dark:text-black
                    md:dark:hover:text-white dark:hover:bg-gray-700
                     dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Users
                </a>
              </Link>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 text-black rounded text-lg
                  hover:bg-gray-100 md:hover:bg-transparent md:border-0
                   md:hover:text-blue-700 md:p-0 dark:text-black
                    md:dark:hover:text-white dark:hover:bg-gray-700
                     dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
