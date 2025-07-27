import { useEffect, useState } from "react";
import "./FetchAllTask.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";



const FetchTask= () => {

  const [viewResult, setViewResult] = useState([]);
  console.log(viewResult);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `http://localhost:7000/Task/${id}`
      );
      window.location.reload();
    } catch (error: any) {
      console.error(error.data.response);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:7000/Task"
        );
        console.log(data);

        setViewResult(data);
      } catch (error) {
        console.error("Result not Found:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="fetch-container">
      <div className="fetch-sub-container">
        <h1>All Projects</h1>
        {viewResult.map((item: any) => (
          <div>
            <span style={{width:"100%",
                          textAlign:"right", 
                          fontSize:"20px", 
                          cursor:"pointer",
                          display:"flex",
                          justifyContent:"right",
                          alignItems:"right",
                          gap:"15px"}}>
              <FaTrash style={{ color: "red", fontSize: "16px", marginTop:"5px" }} onClick={() => handleDelete(item._id)}/>
              <Link to={`/update-task/${item._id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </span>
            
            <h4>{item.title}</h4>
            <p>{item.assignedTo}</p>
            <p>{item.description}</p>
            <p>{item.startDate}</p>
            <p>{item.endDate}</p>
            <button>Status: {item.Status}</button>
            
          </div>
        ))}

      </div>
    </div>   
  );
};

export default FetchTask;