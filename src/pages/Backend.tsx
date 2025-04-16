import React, { useState, useEffect } from "react";
import { FaChartLine, FaUsers, FaClock, FaClipboardList } from "react-icons/fa";

export default function BackendReportDashboard() {
  // Sample employee data for the backend team
  const employees = ["John", "Sarah", "Alex"];

  // Sample backend performance data
  const [performanceData, setPerformanceData] = useState({
    backend: { responseTime: 150, errorRate: 0.2, uptime: 99.8 },
  });

  // Sample attendance data for the backend team
  const [attendanceData, setAttendanceData] = useState({
    John: { daysWorked: 24, daysOff: 0, lateArrivals: 0 },
    Sarah: { daysWorked: 20, daysOff: 4, lateArrivals: 0 },
    Alex: { daysWorked: 22, daysOff: 2, lateArrivals: 1 },
  });

  // Sample task data for each employee with finish status
  const [tasksData, setTasksData] = useState({
    John: [
      { task: "Optimize database queries", finished: true },
      { task: "Update backend API", finished: false },
    ],
    Sarah: [
      { task: "Implement new feature", finished: true },
      { task: "Test API performance", finished: false },
    ],
    Alex: [
      { task: "Fix server issues", finished: true },
      { task: "Code review", finished: false },
    ],
  });

  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  // Simulating dynamic data fetching (useEffect)
  useEffect(() => {
    // You can fetch or update the data based on the current employee or performance.
    // For now, the data is hardcoded.
  }, [selectedEmployee]);

  // Toggle task status (finish/unfinish)
  const toggleTaskStatus = (employee, index) => {
    setTasksData((prevState) => {
      const updatedTasks = prevState[employee].map((task, idx) =>
        idx === index ? { ...task, finished: !task.finished } : task
      );
      return { ...prevState, [employee]: updatedTasks };
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📊 Backend Report Dashboard</h2>

      {/* Employee Selection */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Employee</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="p-2 rounded border w-full bg-white"
        >
          {employees.map((emp, idx) => (
            <option key={idx} value={emp}>
              {emp}
            </option>
          ))}
        </select>
      </div>

      {/* Backend Performance Report */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaChartLine className="mr-2" /> Backend Performance
        </h3>
        <div className="space-y-2">
          <div><strong>Response Time:</strong> {performanceData.backend.responseTime} ms</div>
          <div><strong>Error Rate:</strong> {performanceData.backend.errorRate}%</div>
          <div><strong>Uptime:</strong> {performanceData.backend.uptime}%</div>
        </div>
      </div>

      {/* Attendance Report for Selected Employee */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaUsers className="mr-2" /> Employee Attendance
        </h3>
        <div className="space-y-4">
          <div>
            <strong>Employee:</strong> {selectedEmployee}
          </div>
          <div><strong>Days Worked:</strong> {attendanceData[selectedEmployee]?.daysWorked}</div>
          <div><strong>Days Off:</strong> {attendanceData[selectedEmployee]?.daysOff}</div>
          <div><strong>Late Arrivals:</strong> {attendanceData[selectedEmployee]?.lateArrivals}</div>
        </div>
      </div>

   

      {/* Work List for Selected Employee */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaClipboardList className="mr-2" /> Work List for {selectedEmployee}
        </h3>
        <div className="space-y-4">
          {tasksData[selectedEmployee]?.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className={task.finished ? "line-through text-gray-500" : ""}>
                {task.task}
              </span>
              <button
                onClick={() => toggleTaskStatus(selectedEmployee, idx)}
                className={`px-3 py-1 rounded ${task.finished ? "bg-green-500" : "bg-yellow-500"} text-white`}
              >
                {task.finished ? "Finished" : "Unfinished"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
