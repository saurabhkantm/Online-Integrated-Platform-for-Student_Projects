import LoginForm from "../../components/auth/LoginForm";

const StudentLogin = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6">
    <h2 className="text-2xl font-semibold mb-6">Student Login</h2>
    <LoginForm fixedRole="student" />
  </div>
);

export default StudentLogin;