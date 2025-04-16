import React, { useState, useEffect } from "react";
import { FaChartLine, FaUsers, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function GeneralTeamReport() {
  const team = ["John", "Sarah", "Alex"];

  const [attendanceData, setAttendanceData] = useState({
    John: { daysWorked: 22, daysOff: 2, lateArrivals: 1 },
    Sarah: { daysWorked: 20, daysOff: 4, lateArrivals: 0 },
    Alex: { daysWorked: 24, daysOff: 0, lateArrivals: 0 },
  });

  const [performanceData, setPerformanceData] = useState({
    frontend: { responseTime: 200, errorRate: 0.5, uptime: 99.9 },
    backend: { responseTime: 150, errorRate: 0.2, uptime: 99.8 },
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

  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleString());
  }, []);

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

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📊 General Team Report Dashboard</h2>

      <div className="text-sm text-gray-500 mb-4">Last Updated: {lastUpdated}</div>

      {/* Overall Team Performance */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaChartLine className="mr-2" /> Overall Team Performance
        </h3>
        <div className="space-y-4">
          <div><strong>Frontend Response Time:</strong> {performanceData.frontend.responseTime} ms</div>
          <div><strong>Backend Response Time:</strong> {performanceData.backend.responseTime} ms</div>
          <div><strong>Frontend Uptime:</strong> {performanceData.frontend.uptime}%</div>
          <div><strong>Backend Uptime:</strong> {performanceData.backend.uptime}%</div>
          <div><strong>Overall Team Task Completion:</strong></div>
          <div>
            <progress value={calculateTeamPerformance(taskData)} max="100" className="w-full h-2 bg-gray-200" />
            <div className="text-right">{calculateTeamPerformance(taskData).toFixed(2)}%</div>
          </div>
        </div>
      </div>

      {/* Overall Attendance */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaUsers className="mr-2" /> Overall Attendance
        </h3>
        <div className="space-y-4">
          <div><strong>Overall Attendance Rate:</strong></div>
          <div>
            <progress value={calculateOverallAttendance()} max="100" className="w-full h-2 bg-gray-200" />
            <div className="text-right">{calculateOverallAttendance().toFixed(2)}%</div>
          </div>
        </div>
      </div>

      {/* Team Attendance and Work Summary */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaClock className="mr-2" /> Team Attendance & Work Summary
        </h3>
        <div className="space-y-4">
          {team.map((emp, idx) => {
            const tasks = taskData[emp] || [];
            const totalTasks = tasks.length;
            const finished = tasks.filter(t => t.isFinished).length;
            const unfinished = totalTasks - finished;
            const percentage = totalTasks === 0 ? 0 : (finished / totalTasks) * 100;
            const color = getCompletionColor(percentage);

            return (
              <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                <div className="font-semibold text-lg">{emp}</div>
                <div className="text-sm">Days Worked: {attendanceData[emp]?.daysWorked}</div>
                <div className="text-sm">Late Arrivals: {attendanceData[emp]?.lateArrivals}</div>
                <div className="text-sm mt-1">Tasks: <strong>{totalTasks}</strong></div>
                <div className="flex gap-2 text-sm mt-1">
                  <span className="text-green-600 flex items-center"><FaCheckCircle className="mr-1" />Finished: {finished}</span>
                  <span className="text-red-600 flex items-center"><FaTimesCircle className="mr-1" />Unfinished: {unfinished}</span>
                </div>
                <div className="w-full h-2 bg-gray-300 rounded mt-2">
                  <div
                    className={`h-2 rounded ${color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm">{percentage.toFixed(1)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
