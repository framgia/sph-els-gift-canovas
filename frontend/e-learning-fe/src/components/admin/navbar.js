import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <nav
      class="bg-white px-2  dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b
   border-gray-200 dark:border-gray-600 mb-5"
    >
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/adminDashboard">
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-3">
            E-Learning Admin
          </span>
        </Link>

        <div
          class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/adminDashboard">
                <p
                  class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent 
            md:text-white text-base md:p-0 dark:text-white"
                >
                  Home
                </p>
              </Link>
            </li>

            <li>
              <Link to="/adminUsers">
                <p
                  class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent 
                md:text-white text-base md:p-0 dark:text-white"
                >
                  Users
                </p>
              </Link>
            </li>

            <li>
              <p
                class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent 
              md:text-white text-base md:p-0 dark:text-white cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
