import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL, USER_API } from "../utils/constant";
import { useDispatch } from "react-redux";
import store from "../redux/store";
import { setAuthUser } from "../redux/userSlice.js";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state for submit button
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message); // Show success message
        dispatch(setAuthUser(res.data))
        navigate("/"); // Navigate to the dashboard
      }
    } catch (error) {
      console.error("Login error:", error); // Log full error for debugging
      toast.error(error.response?.data?.message || "An error occurred"); // Show error message
    } finally {
      setLoading(false); // Reset loading state regardless of success or error
    }

    // Reset form fields after submission
    setUser({
      username: "",
      password: ""
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl text-gray-100 font-bold text-center mb-6">
          Login
        </h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Username"
              aria-label="Username"
              required
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter Password"
              aria-label="Password"
              required
            />
          </div>

          <p className="text-center my-2 text-black">
            Create a new account? <Link to="/register" className="text-blue-600 hover:text-blue-400 ">Sign up</Link>
          </p>
          <button
            className="btn btn-primary w-full mt-4 text-lg"
            type="submit"
            
          >  Login
            {/* {loading ? "Logging in..." : "Login"} Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
