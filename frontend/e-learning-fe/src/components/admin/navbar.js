import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <nav class="relative w-full p-6 dark:bg-gray-900 border-border-gray-200 dark:border-gray-600">
      <div class="flex items-center justify-between flex flex-wrap">
        <Link to="/admin-dashboard">
          <span class="self-center text-xl font-semibold dark:text-white ">
            E-Learning Admin
          </span>
        </Link>
        <div class="sm:flex md:flex space-x-6 cursor-pointer">
          <Link to="/admin-dashboard">
            <p class="block py-2 pr-4 pl-3 text-white md:text-white text-base md:p-0 dark:text-white">
              Home
            </p>
          </Link>
          <Link to="/admin-users">
            <p class="block py-2 pr-4 pl-3 text-white md:text-white text-base md:p-0 dark:text-white">
              Users
            </p>
          </Link>
          <p
            class="block py-2 pr-4 pl-3 text-white md:text-white text-base md:p-0 dark:text-white"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
