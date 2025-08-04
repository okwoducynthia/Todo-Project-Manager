import { useState, type FormEvent } from "react";
import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import "./Login.css"
// import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://bankend-project.onrender.com/User/login",
        data,
        {
          headers,
        }
      );

      setSuccessMsg("Login successful!");
      setEmail("");
      setPassword("");

      localStorage.setItem("userId", response.data._id);
        navigate("/taskregister");
        // This navigate is where you would redirect the user after signing up
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <h3>Welcome Back!</h3>

      <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="login-form-container">
            <label>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div style={{
              position: "relative", 
              display:"flex",
              flexDirection:"column",
              }}>
            <label>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top:"35px",
                right:"10px",
                color: "gray"
              }}
            >
              {showPassword ? (
                <EyeSlashIcon style={{
                  height:"15px",
                  width:"15px"
                }} />
              ) : (
                <EyeIcon style={{
                  height:"15px",
                  width:"15px",
                 
                }} />
              )}
            </button>
          </div>

        {/* Feedback Messages */}
        {successMsg && <p style={{
          color:"green"
        }}>{successMsg}</p>}
        {errorMsg && <p style={{
          color:"red"
        }}>{errorMsg}</p>}

        {/* Submit Button */}
        <div className="submit-button-container" >
          <button
            type="submit"
            disabled={loading}
            className={`block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-white shadow ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>

      

  );
}
