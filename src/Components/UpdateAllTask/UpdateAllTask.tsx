import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from 
"react-router-dom";
import { Link } from "react-router-dom";
import "./UpdateAllTask.css"


interface Task {
  title: string;
  assignedTo: string;
  description: string;
  startDate: string;
  endDate: string;
  Status: string;
}

const UpdateAllTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [TaskData, setTaskData] = useState<Task>({
    title: "",
    assignedTo: "",
    description: "",
    startDate: "",
    endDate: "",
    Status: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `https://bankend-project.onrender.com/Task/${id}`
        );
        setTaskData({
          title: data.title || "",
          assignedTo: data.assignedTo || "",
          description: data.description || "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          Status: data.Status || "",
        });
      } catch (error) {
        console.error("Error fetching Task", error);
        setErrorMsg("Failed to load Task.");
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...TaskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !TaskData.title ||
      !TaskData.assignedTo ||
      !TaskData.description ||
      !TaskData.startDate ||
      !TaskData.endDate ||
      !TaskData.Status
    ) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    if (TaskData.description.length < 5) {
      setErrorMsg("Description should not be less than 5.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      await axios.put(
        `https://bankend-project.onrender.com/Task/${id}`,
        TaskData
      );
      setSuccessMsg("Task updated successfully!");
      //NAVIGATION BACK TO SCREEN OF CHOICE
      setTimeout(() => navigate(`/allprojects`), 1200);
    } catch (error) {
      console.error("Error updating Task", error);
      setErrorMsg("Failed to update Task.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="update-sub-container">
      <form onSubmit={handleSubmit}>
        <h1>Update Project</h1>

        {/* ==title section starts here== */}
          <div className="title-update">
            <label>Title</label>
            <input 
            type="text" 
            name="title"
            placeholder="Title" 
            value={TaskData.title} 
            onChange={handleChange}/>
          </div>
          {/* ==title section ends here== */}

          {/* ==assigned section starts here== */}
          <div className="assigned-update">
            <label>Assigned To</label>
            <input 
            type="text" 
            name="assignedTo"
            placeholder="Assigned to"
            value={TaskData.assignedTo} 
            onChange={handleChange}
            />
          </div>
          {/* ==assigned section ends here== */}

          {/* ==description section starts here== */}
          <div className="description-update">
            <label>Description</label>
            <input 
            type="text" 
            name="description"
            placeholder="Description"
            value={TaskData.description} 
            onChange={handleChange} />
          </div>
          {/* ==description section ends here== */}

          {/* ==start-date section starts here== */}
          <div className="update-start-date">
            <label htmlFor="">Start date</label> <br />
            <input 
            type="date"
            name="startDate"
            value={TaskData.startDate} 
            onChange={handleChange} />
          </div>
          {/* ==start-date section ends here== */}

          {/* ==end-date section starts here== */}
          <div className="update-end-date">
            <label htmlFor="">End date</label> <br />
            <input 
            type="date"
            name="endDate"
            value={TaskData.endDate} 
            onChange={handleChange} />
          </div>
          {/* ==end-date section ends here== */}

          {/* ==Status section starts here== */}
          <div>
            <label htmlFor="">Status</label> <br />
              <select
                name="Status"
                id="text"
                value={TaskData.Status}
                onChange={(e) =>
                  setTaskData({ ...TaskData, Status: e.target.value })
                }
                style={{
                  width:"100%",
                  height:"40px",
                  fontSize:"16px",
                  marginBottom:"10px"
                }}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
          </div>


           {successMsg && <div style={{color:"green", fontFamily:"roboto",fontSize:"16px"}}>{successMsg}</div>}
            {errorMsg && <div style={{color:"red", fontFamily:"roboto",fontSize:"16px"}}>{errorMsg}</div>}

          <div className="buttons">
            <Link to={"/allprojects"}><button style={{backgroundColor:"black"}}>Cancel</button></Link>
            

            <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full rounded-lg py-3 font-semibold text-white shadow ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition`}
            >
              {loading ? "Loading..." : "Update Project"}
            </button>
          </div>
      </form>
    </div>

  );
};

export default UpdateAllTask;
