import React from "react";
import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    //username, email, password, confirmPassword
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Confirm password dont match");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full shadow-2xl bg-white rounded-lg   md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                Register for your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black  "
                    placeholder="username"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black  "
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••"
                    className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black  "
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••"
                    className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black  "
                    required
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm cursor-pointer px-5 py-2.5 text-center dark:bg-gray-300 dark:hover:bg-gray-400 dark:focus:ring-black"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-700 dark:text-gray-700">
                  Already have an account?{" "}
                  <a
                    href="/signin"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Log in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
