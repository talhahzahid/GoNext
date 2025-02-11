import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Home = () => {
  const [taskname, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usertask, setUserTask] = useState("");
  const [resfresh, setRefresh] = useState("");
  const token = localStorage.getItem("accessToken");
  // post task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Task submitted:", taskname, description);
    try {
      const response = await fetch(`http://localhost:9000/api/v1/createtask`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskname, description }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("data", data);
      } else {
        setError(
          data.message || "Error Occured Please Check Internet Connection"
        );
      }
    } catch (error) {
      setError("Error Occured");
    } finally {
      setLoading(false);
    }
    taskname("");
    setDescription("");
  };
  // all task
  useEffect(() => {
    const handleAllTask = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/v1/alltask`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log("data", data.task);
          setUserTask(data.task);
        } else {
          setError(
            data.message || "Error Occured Please Check Internet Connection"
          );
        }
      } catch (error) {
        setError("Error Occured");
      } finally {
        setLoading(false);
      }
    };
    handleAllTask();
  }, [resfresh]);
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-lg text-gray-500 mt-2">
            Manage your tasks and projects effortlessly.
          </p>
        </header>
        <div className="flex flex-wrap gap-12 justify-center lg:justify-between">
          {/* Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            {error && <h1 className="text-red-700 text-center">{error}</h1>}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Create New Task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your task title"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={taskname}
                onChange={(e) => setTask(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your task description"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
              >
                {loading ? "Loading...." : "Post"}
              </button>
            </form>
          </div>

          {/* Task List Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              All Tasks
            </h2>
            {usertask ? (
              usertask.map((item) => {
                return (
                  <div key={item._id}>
                    <ul className="space-y-4">
                      <li className="p-4 flex justify-between items-center mb-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-2xl text-gray-800">
                            {item.taskname}
                          </h3>
                          <h2 className="text-gray-600 text-xl">
                            {item.description}
                          </h2>
                        </div>
                        <div className="flex gap-3 text-4xl">
                          <MdOutlineDeleteOutline className="text-red-700" />
                          <CiEdit className="text-green-700" />
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <h1>no task</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
