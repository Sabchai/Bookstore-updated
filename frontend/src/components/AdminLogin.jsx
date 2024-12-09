
import React, { useState } from 'react'
import { useForm } from "react-hook-form"


import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const navigate = useNavigate()

      const onSubmit = async (data) => {
       // console.log(data)
        try {
           const response =  await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
           })
           const auth = response.data;
        //    console.log(auth)
            if(auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.');
                    navigate("/")
                }, 3600 * 1000)
            }

            alert("Admin Login successful!")
            navigate("/dashboard")

        } catch (error) {
            setMessage("Please provide a valid username and password") 
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
              <h1 className="text-2xl font-semibold text-gray-900 text-center">SIGN IN AS ADMIN</h1>
    
              {/* username Field */}
              <div className="relative border-b border-gray-300 focus-within:border-gray-900 transition">
                <i className="bx bxs-user-circle absolute text-xl text-gray-400 left-2 top-3"></i>
                <input
                  {...register("username", { required: true })}
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username "
                  className="w-full pl-8 pr-2 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 focus:border-transparent"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic">Username is required</p>
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
    
              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:shadow-lg transition"
              >
                Login
              </button>
    
            </form>
          </div>
        </div>
      );
    }
    

export default AdminLogin