import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import SignUp from "./components/signup";
import Answer from "./components/answer";
import Results from "./components/results";
import NotAdminUsers from "./components/notAdminUsers";
import UserDetails from "./components/userDetails";
import UpdateUserDetails from "./components/updateUserDetails";
import Categories from "./components/categories";
import OtherUserDetails from "./components/otherUserDetails";
import AdminDashboard from "./components/admin/dashboard";
import WordsLearned from "./components/wordsLearned";
import AdminAddCategory from "./components/admin/addCategory";
import AdminEditCategory from "./components/admin/editCategory";
import AdminAddWordAndChoices from "./components/admin/addWordAndChoices";
import AdminWordsPerCategory from "./components/admin/wordsPerCategory";
import AdminUsers from "./components/admin/adminUsers";
import AdminEditWordAndChoices from "./components/admin/editWordAndChoices";

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/answer"
          element={
            <ProtectedRoute>
              <Answer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <NotAdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <UpdateUserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/other-user"
          element={
            <ProtectedRoute>
              <OtherUserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/words-learned"
          element={
            <ProtectedRoute>
              <WordsLearned />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-add-category"
          element={
            <ProtectedRoute>
              <AdminAddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-edit-category"
          element={
            <ProtectedRoute>
              <AdminEditCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-add-word-choices"
          element={
            <ProtectedRoute>
              <AdminAddWordAndChoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-words-per-category"
          element={
            <ProtectedRoute>
              <AdminWordsPerCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-edit-word-and-choices"
          element={<AdminEditWordAndChoices />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
