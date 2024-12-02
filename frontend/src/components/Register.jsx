import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaGooglePlus } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser,signInWithGoogle} = useAuth();  
  console.log(registerUser)
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Register user
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert("User registered successfully!");
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  // Google sign-in handler 
  const handleGoogleSignIn=  async() => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/")
  } catch (error) {
      alert("Google sign in failed!") 
      console.error(error)
  }
    }

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
      {/* Shapes */}
      <div className="absolute w-52 h-52 bg-gradient-to-b from-gray-900 to-transparent rounded-full -top-28 -left-14"></div>
      <div className="absolute w-52 h-52 bg-gradient-to-b from-gray-900 to-transparent rounded-full -bottom-24 -right-14 transform rotate-180"></div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 relative z-10">
        {/* Form Image */}
        <div className="hidden lg:block mb-8 text-center">
          <img
            src="https://i.postimg.cc/WbVD3VTV/authentication.png"
            alt="Authentication Illustration"
            className="w-52 mx-auto"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">SIGN UP</h1>

          {/* Email Field */}
          <div className="relative border-b border-gray-300 focus-within:border-gray-900 transition">
            <i className="bx bxs-user-circle absolute text-xl text-gray-400 left-2 top-3"></i>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email "
              className="w-full pl-8 pr-2 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">Email is required</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative border-b border-gray-300 focus-within:border-gray-900 transition">
            <i className="bx bx-lock absolute text-xl text-gray-400 left-2 top-3"></i>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full pl-8 pr-2 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">Password is required</p>
            )}
          </div>
          
          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:shadow-lg transition"
          >
            Sign Up
          </button>

          {/* Register Link */}
          <p className="align-baseline font-medium mt-4 text-sm">
            Have an account? Please{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>

          {/* Google Sign-In */}
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 bg-yellow-700 text-white font-medium rounded-lg hover:shadow-lg transition flex items-center justify-center"
            >
              <FaGooglePlus className="text-xl mr-2" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
