import { NavLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6 text-sm">Login to your account</p>

        <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-4 border rounded-lg" />
        <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-4 border rounded-lg" />

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg">Log In</button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account? <NavLink to="/signup" className="text-orange-500">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
