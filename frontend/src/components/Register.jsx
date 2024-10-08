import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL, USER_API } from "../utils/constant";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmpass: "",
    gender: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setUser({
          fullName: "",
          username: "",
          password: "",
          confirmpass: "",
          gender: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred.");
    }
  };

  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value.toLowerCase() });  // Ensuring lowercase
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl text-gray-100 font-bold text-center mb-6">Sign up</h1>
        <form onSubmit={submitHandler}>
          {/* Full Name Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Name"
            />
          </div>
          {/* Username Input */}
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
            />
          </div>
          {/* Password and Confirm Password Inputs */}
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
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Confirm Password</span>
            </label>
            <input
              value={user.confirmpass}
              onChange={(e) => setUser({ ...user, confirmpass: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          {/* Gender Selection */}
          <div className='flex items-center my-4 text-black'>
            <div className='flex items-center mr-6'>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={user.gender === "male"}
                onChange={handleGenderChange}
                className="radio radio-primary mx-2"
              />
              <label className="text-base">Male</label>
            </div>
            <div className='flex items-center'>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={user.gender === "female"}
                onChange={handleGenderChange}
                className="radio radio-primary mx-2"
              />
              <label className="text-base">Female</label>
            </div>
          </div>
          {/* Already have an account? */}
          <p className="text-center my-2 text-black">
            Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-400 ">login</Link>
          </p>
          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-4 text-lg" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
