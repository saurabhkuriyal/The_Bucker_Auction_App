"use client";
import { useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response= await axios.post('http://localhost:5000/api/users/login', form);
            console.log("Login successful:", response.data);

            if(response.data.success){
                window.location.href = '/'; // Redirect to home page
                alert("Login successful");
                
                
                dispatch(
                    setuser({
                        userId:response.data.data._id,
                        username:response.data.data.username,
                        email:response.data.data.email,
                        role:response.data.data.role
                    })
                )
                
                
            } else {
                alert(response.data.data.message);
            }
            

        } catch (error) {
            log("Login error:", error);
        }
        console.log(form);
    };

    return (
        <div className="bg-white">
            {/* Login container (80% height since 20% is header) */}
            <div className="h-[80vh] flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Login to Your Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Phone Number */}
                        {/* <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your phone number"
                            />
                        </div> */}

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Footer Links */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
