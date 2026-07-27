import { Route, Routes } from "react-router-dom";
import DashBoard from "../pages/admin/DashBoard";
import Users from "../pages/admin/Users";
import Colleges from "../pages/admin/Colleges";
import Reports from "../pages/admin/Reports";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="users" element={<Users />} />
      <Route path="colleges" element={<Colleges />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};

export default AdminRoutes;