import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupUser = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/signup`,
      user
    );

    console.log(response.data);
  };

  return (
    <div>
      <h1 className="text-center text-4xl my-4">Signup</h1>

      <div className="max-w-[400px] mx-auto border-1 border-gray-500 py-10 px-14 rounded-md">
        <input
          type="name"
          placeholder="Name"
          className="border p-2 rounded w-full mb-4"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-4"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button
          className="bg-gray-700 text-white px-6 py-2 rounded-md"
          type="button"
          onClick={signupUser}
        >
          Signup
        </button>

        <p className="mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;