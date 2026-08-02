import { Route, Routes } from "react-router-dom";
import DashBoard from "../pages/admin/dashBoard.jsx";
import Users from "../pages/admin/Users.jsx";
import ManageColleges from "../pages/admin/colleges.jsx";
import Reports from "../pages/admin/Reports.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="users" element={<Users />} />
      <Route path="colleges" element={<ManageColleges />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};

export default AdminRoutes;