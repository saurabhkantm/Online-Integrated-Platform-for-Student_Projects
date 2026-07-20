import RegisterForm from "../../components/auth/registerform";

const Register = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6">
    <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>
    <RegisterForm />
  </div>
);

export default Register;