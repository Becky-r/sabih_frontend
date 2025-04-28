import React, { useState, useEffect } from "react";
import { FaChartLine, FaUsers, FaClock, FaClipboardList } from "react-icons/fa";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function BackendReportDashboard() {
  const employees = ["John", "Sarah", "Alex"];
  const [lastUpdated, setLastUpdated] = useState("");

  const [performanceData] = useState({
    backend: { responseTime: 150, errorRate: 0.2, uptime: 99.8 },
  });

  const [attendanceData, setAttendanceData] = useState({
    John: { daysWorked: 24, daysOff: 0, lateArrivals: 0 },
    Sarah: { daysWorked: 20, daysOff: 4, lateArrivals: 0 },
    Alex: { daysWorked: 22, daysOff: 2, lateArrivals: 1 },
  });

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

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString();
    setLastUpdated(formatted);
  }, []);

  const toggleTaskStatus = (employee, index) => {
    setTasksData((prevState) => {
      const updatedTasks = prevState[employee].map((task, idx) =>
        idx === index ? { ...task, finished: !task.finished } : task
      );
      return { ...prevState, [employee]: updatedTasks };
    });

    const now = new Date();
    setLastUpdated(now.toLocaleString());
  };

  const generateWordReport = async () => {
    const tasks = tasksData[selectedEmployee] || [];
    const attendance = attendanceData[selectedEmployee] || {};

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: "📊 Backend Employee Report", bold: true, size: 28 })] }),
            new Paragraph({ text: `Employee: ${selectedEmployee}`, spacing: { before: 200 } }),
            new Paragraph({ text: `Last Updated: ${lastUpdated}` }),
            new Paragraph({ text: "Attendance:" }),
            new Paragraph({ text: `Days Worked: ${attendance.daysWorked}` }),
            new Paragraph({ text: `Days Off: ${attendance.daysOff}` }),
            new Paragraph({ text: `Late Arrivals: ${attendance.lateArrivals}` }),
            new Paragraph({ text: "Backend Performance:", spacing: { before: 200 } }),
            new Paragraph({ text: `Response Time: ${performanceData.backend.responseTime} ms` }),
            new Paragraph({ text: `Error Rate: ${performanceData.backend.errorRate}%` }),
            new Paragraph({ text: `Uptime: ${performanceData.backend.uptime}%` }),
            new Paragraph({ text: "Work List:", spacing: { before: 200 } }),
            ...tasks.map((task, idx) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `${idx + 1}. ${task.task} - ` }),
                  new TextRun({ text: task.finished ? "Finished" : "Unfinished", bold: true }),
                ],
              })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${selectedEmployee}_Backend_Report.docx`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-1">📊 Backend Report Dashboard</h2>
      <p className="text-sm text-gray-600 mb-4">
        Last Updated: <span className="font-medium">{lastUpdated}</span>
      </p>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Employee</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="p-2 rounded border w-full bg-white"
        >
          {employees.map((emp, idx) => (
            <option key={idx} value={emp}>{emp}</option>
          ))}
        </select>
      </div>

      <button
        onClick={generateWordReport}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        📥 Download Report as Word
      </button>

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

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaClipboardList className="mr-2" /> Work List for {selectedEmployee}
        </h3>
        <div className="space-y-4">
          {tasksData[selectedEmployee]?.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className={task.finished ? "line-through text-gray-500" : ""}>{task.task}</span>
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
