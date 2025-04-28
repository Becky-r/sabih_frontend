import React, { useState } from "react";
import { FaPaperclip } from "react-icons/fa";

export default function AdminDashboard() {
  const [timeline, setTimeline] = useState({
    "GreenX Ltd": [
      { date: "2025-04-10", event: "Project Proposal Submitted" },
      { date: "2025-04-12", event: "Manager Review Completed" },
    ],
    "EcoBuilders": [],
    "WaterSafe Inc": [],
    "bereket": [],
    "aman": [],
    "besh": [],
    "robi": [],
  });

  const [tasks, setTasks] = useState({
    "GreenX Ltd": ["Initial Audit", "Budget Approval"],
    "EcoBuilders": ["Site Inspection"],
    "WaterSafe Inc": [],
    "bereket": [],
    "aman": [],
    "besh": [],
    "robi": [],
  });

  const [progressData, setProgressData] = useState({
    "GreenX Ltd": 40,
    "EcoBuilders": 70,
    "WaterSafe Inc": 20,
    "bereket": 0,
    "aman": 0,
    "besh": 0,
    "robi": 0,
  });

  const clients = [
    "GreenX Ltd",
    "EcoBuilders",
    "WaterSafe Inc",
    "bereket",
    "aman",
    "besh",
    "robi",
  ];

  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [newTask, setNewTask] = useState("");
  const [newTimelineEvent, setNewTimelineEvent] = useState("");
  const [response, setResponse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: "client",
      client: "GreenX Ltd",
      text: "Hello, I need assistance with my project.",
      timestamp: "2025-04-16 10:00 AM",
      read: false,
    },
    {
      sender: "client",
      client: "EcoBuilders",
      text: "Can you update me on the task status?",
      timestamp: "2025-04-15 4:30 PM",
      read: true,
    },
  ]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks({
      ...tasks,
      [selectedClient]: [...(tasks[selectedClient] || []), newTask],
    });
    setNewTask("");
  };

  const handleAddTimelineEvent = () => {
    if (!newTimelineEvent.trim()) return;
    const newEvent = {
      date: new Date().toISOString().split("T")[0],
      event: newTimelineEvent,
    };
    setTimeline({
      ...timeline,
      [selectedClient]: [...(timeline[selectedClient] || []), newEvent],
    });
    setNewTimelineEvent("");
  };

  const handleProgressChange = (e) => {
    const value = parseInt(e.target.value);
    setProgressData({
      ...progressData,
      [selectedClient]: value,
    });
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.client === selectedClient &&
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReply = () => {
    if (response.trim() || file) {
      setMessages([
        ...messages,
        {
          sender: "admin",
          client: selectedClient,
          text: response + (file ? ` (📎 ${file.name})` : ""),
          timestamp: new Date().toLocaleString(),
          read: true,
        },
      ]);
      setResponse("");
      setFile(null);
    }
  };

  const unreadCount = messages.filter(
    (msg) => msg.client === selectedClient && msg.sender === "client" && !msg.read
  ).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Select Client */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Select Client</label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="p-2 rounded border w-full bg-white shadow"
        >
          {clients.map((client, idx) => (
            <option key={idx} value={client}>
              {client}
            </option>
          ))}
        </select>
      </div>
      {/* Search Messages */}
      <input
        type="text"
        placeholder="Search messages..."
        className="mb-4 p-2 w-full rounded border shadow"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Unread Notification */}
      <div className="mb-4">
        <span className="text-gray-700 font-medium">
          Unread Messages:
        </span>
        <span className="inline-block px-2 py-1 bg-red-500 text-white rounded-full text-xs ml-2">
          {unreadCount}
        </span>
      </div>

      {/* Communication Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Messages with {selectedClient}
        </h3>
        <div className="h-64 overflow-y-auto border-b border-gray-200 mb-4">
          {filteredMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 p-3 rounded-lg relative ${
                msg.sender === "client" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between text-sm text-gray-500">
                <span>{msg.sender === "client" ? "Client" : "Admin"}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="text-gray-900">{msg.text}</p>
              {!msg.read && (
                <span className="absolute top-2 right-2 text-xs bg-red-400 text-white px-2 rounded">
                  New
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Message Response */}
        <div className="mt-4">
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your message..."
            rows="3"
            className="w-full p-2 border rounded-lg mb-2"
          />
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <FaPaperclip />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span>{file ? file.name : "Attach File"}</span>
            </label>
            <button
              onClick={handleReply}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Progress Update Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Project Progress</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progressData[selectedClient]}
            onChange={handleProgressChange}
            className="w-full"
          />
          <span className="font-bold text-blue-700">
            {progressData[selectedClient]}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progressData[selectedClient]}%` }}
          ></div>
        </div>
      </div>

      {/* Task Manager Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Tasks for {selectedClient}
        </h3>
        <ul className="mb-4 space-y-2">
          {tasks[selectedClient]?.map((task, idx) => (
            <li key={idx} className="p-2 bg-gray-100 rounded shadow-sm">{task}</li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Add new task..."
          />
          <button
            onClick={handleAddTask}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Project Timeline - {selectedClient}
        </h3>
        <ul className="space-y-2 mb-4">
          {timeline[selectedClient]?.length > 0 ? (
            timeline[selectedClient].map((item, idx) => (
              <li key={idx} className="border-l-4 border-blue-600 pl-4">
                <span className="text-sm text-gray-500">{item.date}</span>
                <p className="text-gray-700">{item.event}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No timeline events yet.</p>
          )}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTimelineEvent}
            onChange={(e) => setNewTimelineEvent(e.target.value)}
            placeholder="Add timeline event..."
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleAddTimelineEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
