import React, { useRef, useState } from "react";

const Siginup = () => {
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log(fullname.current.value);
    console.log(email.current.value);
    console.log(password.current.value);
    try {
    } catch (error) {}
    fullname.current.value = "";
    email.current.value = "";
    password.current.value = "";
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] ">
        <form
          onSubmit={handleSignUp}
          action=""
          className="flex flex-col justify-center gap-3  p-[2rem] rounded-lg bg-[#f97316]"
        >
          <h1 className="text-center text-xl text-white font-semibold">
            Sigin Up
          </h1>
          <input
            type="text"
            placeholder="Enter your fullname"
            className="bg-[#f8fafc] p-3 rounded-lg w-full max-w-xs"
            ref={fullname}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-[#f8fafc] p-3 rounded-lg w-full max-w-xs"
            ref={email}
          />
          <input
            type="text"
            placeholder="Enter your password"
            className="bg-[#f8fafc] p-3 rounded-lg w-full max-w-xs"
            ref={password}
          />
          <button
            className="bg-[#c2410c] text-white p-2 rounded-lg"
            type="submit"
          >
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default Siginup;
