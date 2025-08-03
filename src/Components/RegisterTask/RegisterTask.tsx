import "./RegisterTask.css";

import { useState, type FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function RegisterTask() {
    const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    setLoading(true);
    const data = {
      title: title,
      assignedTo: assignedTo,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };
    const headers: any = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://bankend-project.onrender.com/Task",
        data,
        {
          headers,
        }
      );

      setSuccessMsg("Task Registered");
      setTitle("");
      setAssignedTo("");
      setDescription("");
      setStartDate("");

      localStorage.setItem("userId", response.data._id);
        navigate("/allprojects");
        // This navigate is where you would redirect the user after signing up
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Product failed to Add.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="project-sub-container">
        <form action="" onSubmit={handleSubmit}>
          <h1>Project Manager</h1>
          
          {/* ==title section starts here== */}
          <div className="title">
            <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
          </div>
          {/* ==title section ends here== */}

          {/* ==assigned section starts here== */}
          <div className="assigned">
            <input 
            type="text" 
            placeholder="Assigned to"
            value={assignedTo} 
            onChange={(e) => setAssignedTo(e.target.value)}
            />
          </div>
          {/* ==assigned section ends here== */}

          {/* ==description section starts here== */}
          <div className="description">
            <input 
            type="text" 
            placeholder="Description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} />
          </div>
          {/* ==description section ends here== */}

          {/* ==start-date section starts here== */}
          <div className="start-date">
            <label htmlFor="">Start date</label> <br />
            <input 
            type="date"
            value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} />
          </div>
          {/* ==start-date section ends here== */}

          {/* ==end-date section starts here== */}
          <div className="end-date">
            <label htmlFor="">End date</label> <br />
            <input 
            type="date"
            value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} />
          </div>
          {/* ==end-date section ends here== */}


           {successMsg && <div style={{color:"green", fontFamily:"roboto",fontSize:"16px"}}>{successMsg}</div>}
            {errorMsg && <div style={{color:"red", fontFamily:"roboto",fontSize:"16px"}}>{errorMsg}</div>}

          <div className="buttons">
            <Link to={"/allprojects"}><button style={{backgroundColor:"black"}}>All Project</button></Link>

            <button
            type="submit"
            disabled={loading}
            >
              {loading ? "Loading..." : "Add Project"}
            </button>
            
          </div>
        </form>
      </div>
  );
}
