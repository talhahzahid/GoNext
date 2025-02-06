import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:9000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigate("/signin");
      } else {
        setError(data.message || "Check Internet Connection");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col justify-center gap-3 p-[2rem] rounded-lg bg-[#f97316]"
      >
        <h1 className="text-center text-xl text-white font-semibold">
          Sign Up
        </h1>

        {error && (
          <h1 className="text-red-700 text-center font-semibold">{error}</h1>
        )}

        <input
          type="text"
          placeholder="Enter your fullname"
          className="bg-[#f8fafc] p-3 rounded-lg w-full max-w-xs"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
          name="fullname"
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="bg-[#f8fafc] p-3 rounded-lg w-full max-w-xs"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="bg-[#f8fafc] p-3 rounded-lg w-full max-w-xs"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          className="bg-[#c2410c] text-white p-2 rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
