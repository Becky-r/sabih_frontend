import React, { useState, useEffect } from "react";
import { FaChartLine, FaUsers, FaClock, FaCheck, FaExclamationTriangle, FaFileWord } from "react-icons/fa";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

export default function FrontendTeamReport() {
  const frontendTeam = ["John", "Sarah", "Alex"];
  const [attendanceData, setAttendanceData] = useState({
    John: { daysWorked: 22, daysOff: 2, lateArrivals: 1 },
    Sarah: { daysWorked: 20, daysOff: 4, lateArrivals: 0 },
    Alex: { daysWorked: 24, daysOff: 0, lateArrivals: 0 },
  });

  const [performanceData, setPerformanceData] = useState({
    frontend: { responseTime: 200, errorRate: 0.5, uptime: 99.9 },
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

  const [selectedEmployee, setSelectedEmployee] = useState(frontendTeam[0]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString();
    setLastUpdated(formatted);
  }, [selectedEmployee, taskData]);

  const toggleTaskCompletion = (employee, index) => {
    setTaskData((prev) => {
      const updatedTasks = [...prev[employee]];
      updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
      return { ...prev, [employee]: updatedTasks };
    });
  };

  const downloadReport = async () => {
    const tasks = taskData[selectedEmployee];
    const attendance = attendanceData[selectedEmployee];

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: `${selectedEmployee} - Frontend Team Report`,
              heading: "Title",
            }),
            new Paragraph(`Last Updated: ${lastUpdated}`),
            new Paragraph("🧾 Attendance Summary:"),
            new Paragraph(`• Days Worked: ${attendance.daysWorked}`),
            new Paragraph(`• Days Off: ${attendance.daysOff}`),
            new Paragraph(`• Late Arrivals: ${attendance.lateArrivals}`),
            new Paragraph("⚙️ Performance:"),
            new Paragraph(`• Response Time: ${performanceData.frontend.responseTime} ms`),
            new Paragraph(`• Error Rate: ${performanceData.frontend.errorRate}%`),
            new Paragraph(`• Uptime: ${performanceData.frontend.uptime}%`),
            new Paragraph("📋 Task List:"),
            ...tasks.map((t) =>
              new Paragraph(`• ${t.task} - ${t.isFinished ? "✅ Completed" : "⏳ In Progress"}`)
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${selectedEmployee}_Frontend_Report.docx`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">📊 Frontend Team Report Dashboard</h2>
        <button
          onClick={downloadReport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaFileWord /> Download Word
        </button>
      </div>

      {/* Last Updated */}
      <div className="mb-4 text-sm text-gray-500">
        Last Updated: {lastUpdated}
      </div>

      {/* Employee Selection */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Select Employee</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="p-2 rounded border w-full bg-white"
        >
          {frontendTeam.map((emp, idx) => (
            <option key={idx} value={emp}>
              {emp}
            </option>
          ))}
        </select>
      </div>

      {/* Performance Report */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartLine className="mr-2" /> Frontend Performance
          </h3>
          <div className="space-y-2">
            <div><strong>Response Time:</strong> {performanceData.frontend.responseTime} ms</div>
            <div><strong>Error Rate:</strong> {performanceData.frontend.errorRate}%</div>
            <div><strong>Uptime:</strong> {performanceData.frontend.uptime}%</div>
          </div>
        </div>
      </div>

      {/* Attendance Report */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaUsers className="mr-2" /> Employee Attendance
        </h3>
        <div className="space-y-4">
          <div><strong>Employee:</strong> {selectedEmployee}</div>
          <div><strong>Days Worked:</strong> {attendanceData[selectedEmployee]?.daysWorked}</div>
          <div><strong>Days Off:</strong> {attendanceData[selectedEmployee]?.daysOff}</div>
          <div><strong>Late Arrivals:</strong> {attendanceData[selectedEmployee]?.lateArrivals}</div>
        </div>
      </div>

      {/* Task List for Selected Employee */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaClock className="mr-2" /> Task List
        </h3>
        <div className="space-y-4">
          {taskData[selectedEmployee].map((task, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className={task.isFinished ? "line-through text-gray-500" : ""}>{task.task}</span>
              <button
                onClick={() => toggleTaskCompletion(selectedEmployee, index)}
                className={`p-2 rounded-full ${task.isFinished ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
              >
                {task.isFinished ? <FaCheck /> : <FaExclamationTriangle />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
