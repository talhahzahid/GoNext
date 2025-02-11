import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:9000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/");
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
        onSubmit={handleSignIn}
        className="flex flex-col justify-center gap-3 p-[2rem] rounded-lg bg-[#f97316]"
      >
        <h1 className="text-center text-xl text-white font-semibold">
          Sign In
        </h1>
        {error && (
          <h1 className="text-red-700 text-center font-semibold">{error}</h1>
        )}
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
