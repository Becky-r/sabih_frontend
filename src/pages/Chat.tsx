import React, { useState, useEffect, useRef } from "react";
import { FaPaperclip, FaUserCircle, FaTag, FaSmile, FaLock, FaUnlock } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function EmployeeChat() {
  const employees = ["John", "Sarah", "Alex"];
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const [employeeMessages, setEmployeeMessages] = useState({
    John: [],
    Sarah: [],
    Alex: [],
  });

  const [unreadCount, setUnreadCount] = useState({
    John: 0,
    Sarah: 0,
    Alex: 0,
  });

  const [chatInput, setChatInput] = useState("");
  const [tags, setTags] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState("public"); // New state for post visibility
  const messageEndRef = useRef(null);

  const sendMessage = () => {
    if (!chatInput.trim() && !file) return;

    const newMsg = {
      sender: "admin",
      text: `${chatInput} ${tags ? `#${tags.split(' ').join(' #')}` : ""} ${file ? `📎 ${file.name}` : ""}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      visibility, // Add visibility to the message
    };

    setEmployeeMessages((prev) => ({
      ...prev,
      [selectedEmployee]: [...prev[selectedEmployee], newMsg],
    }));

    setChatInput("");
    setTags("");
    setFile(null);
  };

  const simulateEmployeeMessage = (employee, text) => {
    const newMsg = {
      sender: "employee",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setEmployeeMessages((prev) => ({
      ...prev,
      [employee]: [...prev[employee], newMsg],
    }));

    if (employee !== selectedEmployee) {
      setUnreadCount((prev) => ({
        ...prev,
        [employee]: prev[employee] + 1,
      }));
    }
  };

  const handlePostVisibility = () => {
    setVisibility((prev) => (prev === "public" ? "private" : "public"));
  };

  useEffect(() => {
    setUnreadCount((prev) => ({
      ...prev,
      [selectedEmployee]: 0,
    }));
  }, [selectedEmployee]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [employeeMessages]);

  const handleTagChange = (e) => setTags(e.target.value);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">💬 Employee Chat</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Employee</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="p-2 rounded border w-full bg-white"
        >
          {employees.map((emp, idx) => (
            <option key={idx} value={emp}>
              {emp} {unreadCount[emp] > 0 ? `(${unreadCount[emp]} new)` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow h-80 overflow-y-auto mb-4">
        {employeeMessages[selectedEmployee]?.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 p-3 rounded-lg ${
              msg.sender === "employee" ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            <div className="text-sm text-gray-500 flex justify-between">
              <span>{msg.sender === "employee" ? "Employee" : "Admin"}</span>
              <span>{msg.timestamp}</span>
            </div>
            <p className="text-gray-800">{msg.text}</p>
            <p className={`text-xs ${msg.visibility === "public" ? "text-blue-500" : "text-gray-500"}`}>
              {msg.visibility === "public" ? "Public" : "Private"}
            </p>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="relative mb-4">
        {showEmoji && (
          <div className="absolute bottom-20 right-0 z-50">
            <Picker
              data={data}
              onEmojiSelect={(emoji) => setChatInput(chatInput + emoji.native)}
              theme="light"
            />
          </div>
        )}

        <textarea
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 border rounded mb-2"
          rows="3"
        />

        {/* Tags */}
        <div className="flex items-center mb-4">
          <FaTag className="text-gray-500 mr-2" />
          <input
            type="text"
            value={tags}
            onChange={handleTagChange}
            placeholder="Add tags (e.g., #task #progress)"
            className="w-full p-2 border rounded-lg shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-gray-500 items-center">
            <label className="flex items-center cursor-pointer text-blue-600">
              <FaPaperclip />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="flex items-center cursor-pointer text-blue-600">{file ? file.name : "Attach File"}</span>
            </label>
             
            <FaSmile
              title="Add Emoji"
              className="cursor-pointer hover:text-yellow-500"
              onClick={() => setShowEmoji(!showEmoji)}
            />
          </div>

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>

      {/* Visibility Toggle */}
      <div className="flex items-center mb-4">
        <div
          onClick={handlePostVisibility}
          className={`flex items-center cursor-pointer ${visibility === "public" ? "text-blue-600" : "text-gray-500"}`}
        >
          {visibility === "public" ? <FaUnlock className="mr-2" /> : <FaLock className="mr-2" />}
          <span>{visibility === "public" ? "Public" : "Private"}</span>
        </div>
      </div>

      {/* Simulate */}
      <div className="text-right">
        <button
          onClick={() => simulateEmployeeMessage(selectedEmployee, "Hi admin, quick update!")}
          className="text-sm text-gray-500 hover:text-blue-600"
        >
          Simulate Message from {selectedEmployee}
        </button>
      </div>
    </div>
  );
}
