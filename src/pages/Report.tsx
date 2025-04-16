import React, { useState, useEffect } from "react";
import { FaChartLine, FaUsers, FaClock, FaCheckCircle, FaTimesCircle, FaSearch, FaTrophy } from "react-icons/fa";

export default function GeneralTeamReport() {
  const team = ["John", "Sarah", "Alex"];
  const [searchTerm, setSearchTerm] = useState("");

  const [attendanceData, setAttendanceData] = useState({
    John: { daysWorked: 22, daysOff: 2, lateArrivals: 1, monthly: [5, 6, 5, 6] },
    Sarah: { daysWorked: 20, daysOff: 4, lateArrivals: 0, monthly: [4, 5, 5, 6] },
    Alex: { daysWorked: 24, daysOff: 0, lateArrivals: 0, monthly: [6, 6, 6, 6] },
  });

  const [taskData, setTaskData] = useState({
    John: [
      { task: "Build Login Page", isFinished: true },
      { task: "Fix Navbar Bug", isFinished: false },
      { task: "Implement API Integration", isFinished: false },
    ],
    Sarah: [
      { task: "Design Homepage", isFinished: true },
      { task: "Update CSS Styles", isFinished: true },
      { task: "Optimize JS Performance", isFinished: false },
    ],
    Alex: [
      { task: "Create Component Library", isFinished: true },
      { task: "Set Up Redux", isFinished: true },
      { task: "Write Unit Tests", isFinished: true },
    ],
  });

  const [performanceData, setPerformanceData] = useState({
    frontend: { responseTime: 200, errorRate: 0.5, uptime: 99.9 },
    backend: { responseTime: 150, errorRate: 0.2, uptime: 99.8 },
  });

  const filteredTeam = team.filter((emp) =>
    emp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findMostActiveEmployee = () => {
    let maxTasks = 0;
    let bestPerformer = "";
    for (let emp in taskData) {
      const finished = taskData[emp].filter(t => t.isFinished).length;
      if (finished > maxTasks) {
        maxTasks = finished;
        bestPerformer = emp;
      }
    }
    return bestPerformer;
  };

  const calculateTeamPerformance = (teamData) => {
    let completedTasks = 0;
    let totalTasks = 0;
    for (let emp in teamData) {
      teamData[emp].forEach((task) => {
        totalTasks++;
        if (task.isFinished) completedTasks++;
      });
    }
    return (completedTasks / totalTasks) * 100;
  };

  const calculateOverallAttendance = () => {
    let totalDaysWorked = 0;
    let totalDaysOff = 0;
    team.forEach((emp) => {
      totalDaysWorked += attendanceData[emp]?.daysWorked || 0;
      totalDaysOff += attendanceData[emp]?.daysOff || 0;
    });
    return (totalDaysWorked / (totalDaysWorked + totalDaysOff)) * 100;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📊 General Team Report Dashboard</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <FaSearch />
        <input
          type="text"
          placeholder="Search team member..."
          className="p-2 border rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Most Active */}
      <div className="bg-yellow-100 p-3 rounded mb-6 shadow flex items-center gap-2">
        <FaTrophy className="text-yellow-600" />
        <span className="font-semibold">
          🏆 Most Active Employee: {findMostActiveEmployee()}
        </span>
      </div>

      {/* General Summary Report */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Company Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">🏢 Company Performance</h4>
          <p><strong>Frontend Uptime:</strong> {performanceData.frontend.uptime}%</p>
          <p><strong>Backend Uptime:</strong> {performanceData.backend.uptime}%</p>
          <p><strong>Average Response:</strong> {(performanceData.frontend.responseTime + performanceData.backend.responseTime) / 2} ms</p>
        </div>

        {/* Team Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">👥 Team Performance</h4>
          <p><strong>Total Tasks:</strong> {
            Object.values(taskData).flat().length
          }</p>
          <p><strong>Completed:</strong> {
            Object.values(taskData).flat().filter(t => t.isFinished).length
          }</p>
          <p><strong>Completion Rate:</strong> {calculateTeamPerformance(taskData).toFixed(1)}%</p>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">📅 Attendance Summary</h4>
          <p><strong>Total Days Worked:</strong> {
            team.reduce((acc, emp) => acc + (attendanceData[emp]?.daysWorked || 0), 0)
          }</p>
          <p><strong>Total Days Off:</strong> {
            team.reduce((acc, emp) => acc + (attendanceData[emp]?.daysOff || 0), 0)
          }</p>
          <p><strong>Overall Rate:</strong> {calculateOverallAttendance().toFixed(1)}%</p>
        </div>

        {/* Employee Work State Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-full lg:col-span-3">
          <h4 className="text-lg font-semibold mb-4">👤 Employee Work States</h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {team.map((emp, idx) => {
              const total = taskData[emp].length;
              const completed = taskData[emp].filter(t => t.isFinished).length;
              return (
                <div key={idx} className="border p-3 rounded">
                  <p className="font-bold mb-1">{emp}</p>
                  <p>✔️ Finished: {completed}</p>
                  <p>❌ In Progress: {total - completed}</p>
                  <p>📊 Completion: {((completed / total) * 100).toFixed(1)}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Attendance Breakdown */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">📅 Monthly Attendance (Last 4 Months)</h3>
        {filteredTeam.map((emp, idx) => (
          <div key={idx} className="mb-4">
            <div className="font-semibold mb-1">{emp}</div>
            <div className="grid grid-cols-4 gap-2 text-sm">
              {attendanceData[emp]?.monthly?.map((days, i) => (
                <div key={i} className="bg-blue-100 p-2 rounded text-center">
                  Month {i + 1}: {days} days
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
