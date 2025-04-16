import React, { useState } from "react";

export default function TaskAllocation() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    startDate: "",
    endDate: "",
  });
  const [filterType, setFilterType] = useState("Date");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Task
  const addTask = () => {
    if (!form.title || !form.assignedTo) return;
    setTasks([
      ...tasks,
      {
        ...form,
        status: "Pending",
        id: Date.now(),
      },
    ]);
    setForm({
      title: "",
      description: "",
      assignedTo: "",
      startDate: "",
      endDate: "",
    });
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Complete Task
  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Complete" } : task
      )
    );
  };

  // Filter
  const filteredTasks = [...tasks].sort((a, b) => {
    if (filterType === "Name") {
      return a.assignedTo.localeCompare(b.assignedTo);
    }
    return new Date(a.endDate) - new Date(b.endDate);
  });

  return (
    <div className="bg-gray-100 p-6 min-h-screen rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">Task Allocation</h1>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4 max-w-4xl">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-md"
          placeholder="Task"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-md"
          placeholder="Description"
        />
        <div className="flex flex-wrap gap-4">
          <input
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className="flex-1 p-3 border border-gray-200 rounded-md"
            placeholder="Assigned to"
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="flex-1 p-3 border border-gray-200 rounded-md"
            placeholder="Start Date"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="flex-1 p-3 border border-gray-200 rounded-md"
            placeholder="End Date"
          />
        </div>
        <button
          onClick={addTask}
          className="mt-2 px-4 py-2 bg-black text-white rounded-md"
        >
          Add Task
        </button>
      </div>

      {/* Filter */}
      <div className="mt-6 flex items-center space-x-2 text-sm font-medium">
        <p>Filter by :</p>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded-md bg-white shadow-sm"
        >
          <option value="Date">Date</option>
          <option value="Name">Name</option>
        </select>
      </div>

      {/* Task List */}
      <div className="mt-4 space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div className="text-xl">📄</div>
              <div>
                <p className="font-bold">{task.title}</p>
                <p className="text-sm text-gray-500">{task.assignedTo}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span>📅</span>
                <span>{new Date(task.endDate).toLocaleDateString()}</span>
              </div>
              {task.status === "Complete" ? (
                <button className="bg-green-600 text-white text-xs px-4 py-1 rounded-full">
                  Complete
                </button>
              ) : (
                <>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="bg-black text-white text-xs px-4 py-1 rounded-full"
                  >
                    View Detail
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white text-xs px-4 py-1 rounded-full"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
