import React, { useState } from "react";
import { FaClock, FaUsers, FaSearch, FaTrophy, FaChartBar, FaDownload } from "react-icons/fa";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function TimeSheetDashboard() {
  const [view, setView] = useState("monthly");
  const [search, setSearch] = useState("");

  const employees = [
    {
      name: "John",
      totalHours: 160,
      weeklyHours: 40,
      projectHours: { Login: 40, Dashboard: 60, API: 60 },
      goals: { monthly: 160, weekly: 40 },
    },
    {
      name: "Sarah",
      totalHours: 140,
      weeklyHours: 35,
      projectHours: { Homepage: 50, Styles: 50, Optimization: 40 },
      goals: { monthly: 160, weekly: 40 },
    },
    {
      name: "Alex",
      totalHours: 180,
      weeklyHours: 45,
      projectHours: { Library: 80, Redux: 50, Tests: 50 },
      goals: { monthly: 200, weekly: 50 },
    },
  ];

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const companyTotalHours = filteredEmployees.reduce(
    (sum, emp) => sum + (view === "monthly" ? emp.totalHours : emp.weeklyHours),
    0
  );

  const bestPerformer = [...filteredEmployees].sort(
    (a, b) =>
      (view === "monthly" ? b.totalHours : b.weeklyHours) - 
      (view === "monthly" ? a.totalHours : a.weeklyHours)
  )[0]?.name;

  const getProjectSummary = () => {
    const summary = {};
    filteredEmployees.forEach((emp) => {
      for (let proj in emp.projectHours) {
        summary[proj] = (summary[proj] || 0) + emp.projectHours[proj];
      }
    });
    return Object.entries(summary).map(([project, totalHours]) => ({
      project,
      totalHours,
    }));
  };

  const getGoalProgress = (employee) => {
    const totalHours = view === "monthly" ? employee.totalHours : employee.weeklyHours;
    const goal = view === "monthly" ? employee.goals.monthly : employee.goals.weekly;
    return Math.min((totalHours / goal) * 100, 100);
  };

  // Download the timesheet data as a Word document
  const downloadWordFile = () => {
    const doc = new Document();

    doc.addSection({
      children: [
        new Paragraph({
          children: [new TextRun("🕒 Company Timesheet Dashboard").bold().size(24)],
        }),
        new Paragraph({
          children: [new TextRun(`Total ${view === "monthly" ? "Monthly" : "Weekly"} Hours: ${companyTotalHours} hrs`)],
        }),
        new Paragraph({
          children: [new TextRun(`Best Performer: ${bestPerformer || "N/A"}`)],
        }),
        new Paragraph({
          children: [new TextRun(`Team Average Hours: ${(companyTotalHours / filteredEmployees.length || 0).toFixed(1)} hrs`)],
        }),
        new Paragraph({
          children: [new TextRun("Employee Timesheets:")],
        }),
        ...filteredEmployees.map((emp) => 
          new Paragraph({
            children: [
              new TextRun(`${emp.name}: ${view === "monthly" ? emp.totalHours : emp.weeklyHours} hrs`),
              new TextRun(` | Goal: ${getGoalProgress(emp)}%`),
            ],
          })
        ),
        new Paragraph({
          children: [new TextRun("Project Time Summary:")],
        }),
        ...getProjectSummary().map(({ project, totalHours }) => 
          new Paragraph({
            children: [
              new TextRun(`${project}: ${totalHours} hrs`)
            ],
          })
        ),
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Timesheet_Report.docx";
      link.click();
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">🕒 Company Timesheet Dashboard</h2>

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2 w-full max-w-md">
          <FaSearch />
          <input
            type="text"
            placeholder="Search employee..."
            className="p-2 border rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${view === "monthly" ? "bg-blue-600 text-white" : "bg-white"}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded ${view === "weekly" ? "bg-blue-600 text-white" : "bg-white"}`}
            onClick={() => setView("weekly")}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FaClock /> Total {view === "monthly" ? "Monthly" : "Weekly"} Hours
          </h4>
          <p className="text-xl font-bold">{companyTotalHours} hrs</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FaUsers /> Team Avg Hours
          </h4>
          <p className="text-xl font-bold">
            {(companyTotalHours / filteredEmployees.length || 0).toFixed(1)} hrs
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FaTrophy /> Best Performer
          </h4>
          <p className="text-lg font-bold">{bestPerformer || "N/A"}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FaChartBar /> Milestone Progress
          </h4>
          <p className="text-xl font-bold">Goal Achieved: {getGoalProgress(filteredEmployees[0])}%</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-right mb-6">
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={downloadWordFile}
        >
          <FaDownload className="inline mr-2" /> Download Report
        </button>
      </div>

      {/* Employee Timesheets */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">👤 Employee Timesheets</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEmployees.map((emp, idx) => (
            <div key={idx} className="border p-4 rounded bg-gray-50">
              <h4 className="font-bold text-lg mb-2">{emp.name}</h4>
              <p className={`mb-2 ${emp.totalHours > 160 ? "text-red-500" : ""}`}>
                {view === "monthly"
                  ? `Total: ${emp.totalHours} hrs`
                  : `This Week: ${emp.weeklyHours} hrs`}
              </p>
              <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-blue-600 h-full"
                  style={{
                    width: `${getGoalProgress(emp)}%`,
                  }}
                ></div>
              </div>
              <div className="text-sm">
                {Object.entries(emp.projectHours).map(([proj, hrs], i) => (
                  <div key={i} className="flex justify-between">
                    <span>{proj}</span>
                    <span>{hrs} hrs</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">📁 Project Time Summary</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getProjectSummary().map(({ project, totalHours }, idx) => (
            <div key={idx} className="bg-blue-100 p-3 rounded">
              <h4 className="font-semibold">{project}</h4>
              <p>{totalHours} hrs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
