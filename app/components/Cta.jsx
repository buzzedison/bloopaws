"use client"

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import sendToAirtable from "../api/utils/sendToAirtable";
import { useRouter } from "next/navigation";
import * as tracking from "../lib/tracking";

export default function NewsletterCTA() {
  const router = useRouter()
  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    onSubmit: async (data) => {
      try {
        await sendToAirtable(data.email);

        // Track Newsletter Signup
        tracking.trackNewsletterSignup('Homepage CTA');

        router.push("/");
        console.log("Email sent to Airtable successfully");
      } catch (error) {
        console.error("Error sending email to Airtable:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-red-400 via-red-700 to-red-500 py-16 px-0 w-full">
      <div className="md:w-1/2">
        <div className="max-w-screen-xl w-full text-center space-y-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Unlock the Growth Tools of Tomorrow, Today!
          </h2>
          <p className="text-lg text-white">
            Get ahead of the curve with cutting-edge insights, courses, and
            resources. All served fresh in our weekly newsletter.
          </p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="relative rounded-full shadow-lg">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email is invalid",
                  },
                }}
                render={({ onChange, onBlur, value }) => (
                  <input

                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full py-3 pl-12 pr-4 rounded-full text-black placeholder-black focus:ring focus:ring-purple-200 transition duration-300"
                    placeholder="Enter your email..."
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.002 8.002 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a7.003 7.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
            </div>
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 rounded-full text-white bg-black hover:bg-gray-800 focus:ring focus:ring-purple-200 transition duration-300"
            >
              <span>Join the Future</span>
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
