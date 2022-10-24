import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/results" element={<Results />} />
        <Route path="/users" element={<NotAdminUsers />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/update" element={<UpdateUserDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/otherUser" element={<OtherUserDetails />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/wordsLearned" element={<WordsLearned />} />
        <Route path="/adminAddcategory" element={<AdminAddCategory />} />
        <Route path="/adminEditCategory" element={<AdminEditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
