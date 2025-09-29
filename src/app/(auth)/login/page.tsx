"use client";
//import { apiUrl } from "@/apiConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

import { signInInfoSchema } from "../../configFiles/validation/signinValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiUrl } from "@/api_config";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";

type zodInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [errorInfo, setErrorInfo] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      email: "",

      password: "",
    },
    resolver: zodResolver(signInInfoSchema),
  });
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   const form = event.target;
  //   const formData = new FormData(form);

  //   type zodInputs = {
  //     email: string;
  //     password: string;
  //   };

  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors, isSubmitting },
  //   } = useForm<zodInputs>({
  //     defaultValues: {

  //       email: "",

  //       password: "",

  //     },
  //     resolver: zodResolver(signInInfoSchema),
  //   });

  //   fetch(`${apiUrl}/login_register/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Request successful");
  //         return response.json();
  //       } else {
  //         throw new Error("Request failed with status: " + response.status);
  //       }
  //     })
  //     .then((data) => {
  //       // Process the response data
  //       console.log("works");
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log("not work");
  //       // Handle any errors that occurred during the request
  //       console.error(error);
  //     });
  // };
  const { push } = useRouter();
  const onSubmit: SubmitHandler<zodInputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    // const { confirmPassword, ...formData } = data;
    console.log(data);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    fetch(`${apiUrl}/newlogin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Working");
          return response.json();
          //console.log(response.json());
          // console.log("Working")
        }
        throw new Error("Error: " + response.status);
      })
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);
        setAccessToken(responseData.accessToken);
console.log("Token: "+ responseData.accessToken)
        toast({
          title: `Success!`,
          description: `Login Successful`,
        });
        // push("/");
        window.location.href = "/";
      })
      .catch((error) => {
        // Handle any errors during the request
        console.log("Not Working");
        console.error("Error:", error);
        setErrorInfo("Invalid Credentials!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
            <img src="/common_files/main/fayida_logo.png" alt="Fayida Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-blue-100 mt-2">Sign in to your Fayida Academy account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errorInfo && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errorInfo}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
