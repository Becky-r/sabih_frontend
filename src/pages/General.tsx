import React, { useState, useEffect } from "react";
import { FaChartLine, FaUsers, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function GeneralTeamReport() {
  const team = ["John", "Sarah", "Alex"];

  const [attendanceData] = useState({
    John: { daysWorked: 22, daysOff: 2, lateArrivals: 1 },
    Sarah: { daysWorked: 20, daysOff: 4, lateArrivals: 0 },
    Alex: { daysWorked: 24, daysOff: 0, lateArrivals: 0 },
  });

  const [performanceData] = useState({
    frontend: { responseTime: 200, errorRate: 0.5, uptime: 99.9 },
    backend: { responseTime: 150, errorRate: 0.2, uptime: 99.8 },
  });

  const [taskData] = useState({
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
    let completedTasks = 0, totalTasks = 0;
    for (let emp in teamData) {
      teamData[emp].forEach((task) => {
        totalTasks++;
        if (task.isFinished) completedTasks++;
      });
    }
    return (completedTasks / totalTasks) * 100;
  };

  const calculateOverallAttendance = () => {
    let totalDaysWorked = 0, totalDaysOff = 0;
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

  const generateReportDoc = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: "📊 General Team Report Dashboard", bold: true, size: 28 })] }),
            new Paragraph({ text: `Last Updated: ${lastUpdated}` }),
            new Paragraph({ text: "Overall Team Performance", spacing: { before: 200 } }),
            new Paragraph({ text: `Frontend Response Time: ${performanceData.frontend.responseTime} ms` }),
            new Paragraph({ text: `Backend Response Time: ${performanceData.backend.responseTime} ms` }),
            new Paragraph({ text: `Frontend Uptime: ${performanceData.frontend.uptime}%` }),
            new Paragraph({ text: `Backend Uptime: ${performanceData.backend.uptime}%` }),
            new Paragraph({ text: `Overall Task Completion: ${calculateTeamPerformance(taskData).toFixed(2)}%` }),
            new Paragraph({ text: "Overall Attendance", spacing: { before: 200 } }),
            new Paragraph({ text: `Attendance Rate: ${calculateOverallAttendance().toFixed(2)}%` }),
            new Paragraph({ text: "Team Attendance & Work Summary", spacing: { before: 200 } }),
            ...team.flatMap((emp) => {
              const tasks = taskData[emp] || [];
              const finished = tasks.filter(t => t.isFinished).length;
              const unfinished = tasks.length - finished;
              const percentage = tasks.length === 0 ? 0 : (finished / tasks.length) * 100;
              return [
                new Paragraph({ text: `\n${emp}`, heading: "Heading2" }),
                new Paragraph({ text: `Days Worked: ${attendanceData[emp]?.daysWorked}` }),
                new Paragraph({ text: `Late Arrivals: ${attendanceData[emp]?.lateArrivals}` }),
                new Paragraph({ text: `Finished Tasks: ${finished}` }),
                new Paragraph({ text: `Unfinished Tasks: ${unfinished}` }),
                new Paragraph({ text: `Task Completion: ${percentage.toFixed(1)}%` }),
              ];
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Team_Report.docx");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📊 General Team Report Dashboard</h2>
      <div className="text-sm text-gray-500 mb-4">Last Updated: {lastUpdated}</div>

      <button onClick={generateReportDoc} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        📥 Download Report as Word
      </button>

      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center"><FaChartLine className="mr-2" /> Overall Team Performance</h3>
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

      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center"><FaUsers className="mr-2" /> Overall Attendance</h3>
        <div className="space-y-4">
          <div><strong>Overall Attendance Rate:</strong></div>
          <div>
            <progress value={calculateOverallAttendance()} max="100" className="w-full h-2 bg-gray-200" />
            <div className="text-right">{calculateOverallAttendance().toFixed(2)}%</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center"><FaClock className="mr-2" /> Team Attendance & Work Summary</h3>
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
                  <div className={`h-2 rounded ${color}`} style={{ width: `${percentage}%` }}></div>
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
