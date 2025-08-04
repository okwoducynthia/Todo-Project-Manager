import { useState, type FormEvent } from "react";
import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
// import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
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
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://bankend-project.onrender.com/User/Signup",
        data,
        {
          headers,
        }
      );

      setSuccessMsg("Signup successful!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      localStorage.setItem("userId", response.data._id);
        navigate("/taskregister");
        // This navigate is where you would redirect the user after signing up
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="sign-up-container">
      <div>
        <h1>Sign Up</h1>
        <h3>Welcome!</h3>
      </div>

      {/* First Name */}
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="">First Name</label>
        <input type="text"
         value={firstName}
          onChange={(e) => setFirstName(e.target.value)} />
      </div>

      {/* Last Name */}
      <div className="form-group">
        <label htmlFor="">Last Name</label>
        <input type="text" 
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)} />
      </div>

        {/* /* Email */}
      <div className="form-group">
        <label htmlFor="">Email</label>
        <input type="text" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label htmlFor="phone-number">Phone Number</label>
        <input type="text" 
        value={phoneNumber} 
        placeholder="+234-246-24527"
        onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      {/* Password */}
      <div style={{
        position: "relative", 
        display:"flex",
        flexDirection:"column",
        }}>
        <label htmlFor="">Password</label>
        <input 
        type={showPassword ? "text" : "password"} 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} />
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
        <div className="submit-button-container">
          <button
            type="submit"
            disabled={loading}
            className={`block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-white shadow ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </div>
      </form>
   
  </div>
   );
}
