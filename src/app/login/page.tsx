"use client";
//import { apiUrl } from "@/apiConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

import { signInInfoSchema } from "../configFiles/validation/signinValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiUrl } from "@/api_config";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";

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
    fetch(`${apiUrl}/newlogin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    <div className="w-full flex pb-64   p-5 h-full">
      <div className="grid grid-cols-2  mx-auto shadow-2xl ">
        <div className="bg-white p-10 rounded-2xl overflow-hidden">
          <h1 className="text-lg font-semibold text-primaryColor">Sign In</h1>
          <br />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              {errorInfo != "" && <div>{errorInfo}</div>}
              <div className="space-x-3">
                {errors.email?.message && <h1>{errors.email?.message}</h1>}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Email
                </label>

                <input
                  className="px-2 border-b-2 border-primaryColor "
                  type="text"
                  // name="firstName"
                  id="email"
                  {...register("email")}
                />
              </div>

              <div className="space-x-3">
                {errors.password?.message && (
                  <h1>{errors.password?.message}</h1>
                )}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Password
                </label>

                <input
                  className="px-2 border-b-2 border-primaryColor "
                  type="password"
                  // name="firstName"
                  id="password"
                  {...register("password")}
                />
              </div>

              <div className="w-full flex">
                <button
                  type="submit"
                  className="w-3/4 py-1 mx-auto bg-primaryColor text-white rounded-full"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          {/* <div className="mt-5 text-sm">
            <Link href={"/forgot_password"}>
              {" "}
              <button>Forgot Password?</button>
            </Link>
          </div> */}
        </div>

        <div className="p-10 w-full flex   bg-gradient-to-r from-blue-300 to-sky-300 rounded-2xl">
          <div className="mx-auto my-auto">
            <div className="w-full flex pb-4">
              <div className="w-52 mx-auto ">
                <img src="common_files/main/fayida_logo.png" alt="" />
              </div>
            </div>
            <h1 className="text-xl text-gray-800 font-semibold pb-10">
              Welcome to Fayida Acadamy
            </h1>

            <div className="w-full flex pt-7">
              <div className="mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
