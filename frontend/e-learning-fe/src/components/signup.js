import React from "react";

function SignUp() {
  return (
    <section>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div class="w-3/4 h-4/5  bg-white rounded-lg shadow dark:border dark:bg-gray-300 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Create E-Learning Account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div class="flex flex-row space-x-44">
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="bg-red-50 border border-red-200 text-gray-900 w-96
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 w-96
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div class="flex flex-row space-x-44">
                <div>
                  <label
                    for="firstname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="bg-gray-50 border border-gray-300 text-gray-900  w-96
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="firstname"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 w-96
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                      w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div class="flex flex-row space-x-44">
                <div>
                  <label
                    for="lastname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="bg-gray-50 border border-gray-300 text-gray-900 w-96
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="lastname"
                    required
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 w-96
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                      w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="is_admin"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 
                        focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 
                        dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="is_admin"
                    class="font-light text-black dark:text-black"
                  >
                    Admin
                  </label>
                </div>
              </div>
              <button
                type="submit"
                class="w-96 text-black bg-primary-600 hover:bg-primary-700 
                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium ml-72
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 bg-green-600
                dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create Account
              </button>
              <p class="text-sm font-light text-black dark:text-black">
                Already have an account?{" "}
                <a
                  href="#"
                  class="font-medium text-black hover:underline dark:text-black"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
