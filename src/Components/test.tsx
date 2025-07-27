import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

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
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/Task/${id}`
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
        console.error("Error fetching profile", error);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
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
      setError("Please fill all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(TaskData.title)) {
      setError("Please enter a valid email.");
      return;
    }

    if (TaskData.assignedTo.length < 8) {
      setError("Phone number is too short.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.put(
        `http://localhost:7000/Task/${id}`,
        TaskData
      );
      setSuccess("Profile updated successfully!");
      //NAVIGATION BACK TO SCREEN OF CHOICE
      setTimeout(() => navigate(`/userprofile`), 1300);
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-black rounded-2xl shadow-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Update Project
        </h2>

        {error && (
          <p className="text-center text-red-500 text-sm mb-4">{error}</p>
        )}
        {success && (
          <p className="text-center text-green-500 text-sm mb-4">{success}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white">
              Title
            </label>
            <input
              type="text"
              name="firstName"
              value={TaskData.title}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white">
              Assigned to
            </label>
            <input
              type="text"
              name="lastName"
              value={TaskData.assignedTo}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white">
              Description
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={TaskData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white">
              Start Date
            </label>
            <input
              type="email"
              name="email"
              value={TaskData.startDate}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white">
              End Date
            </label>
            <input
              type="email"
              name="email"
              value={TaskData.endDate}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          {/* <div>
            <label className="block text-sm text-white">
              Status
            </label>
            <input
              type="email"
              name="email"
              value={userData.Status}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div> */}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full rounded-lg py-3 font-semibold text-white shadow ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAllTask;
