import React, { useState } from 'react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');

  const [todos, setTodos] = useState({}); // { employeeName: [task1, task2] }
  const [taskInput, setTaskInput] = useState({}); // { employeeName: currentInput }
  const [editingIndex, setEditingIndex] = useState({}); // { employeeName: index }

  // Add Project
  const handleAddProject = () => {
    if (!projectName) return;
    setProjects([...projects, { name: projectName, startDate, endDate }]);
    setProjectName('');
    setStartDate('');
    setEndDate('');
  };

  // Add Employee
  const handleAddEmployee = () => {
    if (!employeeName || employees.includes(employeeName)) return;
    setEmployees([...employees, employeeName]);
    setEmployeeName('');
  };

  // Save Task (new or edited)
  const handleSaveTask = (name) => {
    const input = taskInput[name];
    if (!input) return;

    const currentTodos = todos[name] || [];

    // If editing, update specific index
    if (editingIndex[name] !== undefined) {
      const updatedTodos = [...currentTodos];
      updatedTodos[editingIndex[name]] = input;
      setTodos({ ...todos, [name]: updatedTodos });
      setEditingIndex({ ...editingIndex, [name]: undefined });
    } else {
      // Else add new
      setTodos({ ...todos, [name]: [...currentTodos, input] });
    }

    setTaskInput({ ...taskInput, [name]: '' });
  };

  // Edit Task
  const handleEditTask = (name, index) => {
    setTaskInput({ ...taskInput, [name]: todos[name][index] });
    setEditingIndex({ ...editingIndex, [name]: index });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen font-sans">
      {/* Project & Employee Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Projects */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="flex-1 p-2 rounded-full border"
            />
            <button onClick={handleAddProject} className="bg-green-500 text-white px-4 py-2 rounded-full">
              Add
            </button>
          </div>
          <div className="flex space-x-2 mb-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded-full"
            />
          </div>
          {projects.map((proj, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-2xl mt-2">
              <div className="font-semibold">{proj.name}</div>
              <div className="text-sm text-gray-600">
                {proj.startDate} to {proj.endDate}
              </div>
            </div>
          ))}
        </div>

        {/* Employees */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Employees</h2>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Employee Name"
              className="flex-1 p-2 rounded-full border"
            />
            <button onClick={handleAddEmployee} className="bg-green-500 text-white px-4 py-2 rounded-full">
              Add
            </button>
          </div>

          {employees.map((name, i) => (
            <div key={i} className="mb-4 p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="font-semibold">{name}</div>
              <div className="flex space-x-2">
                <select className="p-2 border rounded-full">
                  <option>Role</option>
                  <option>Designer</option>
                  <option>Developer</option>
                </select>
                <input
                  type="file"
                  className="file:border file:rounded-full file:px-2 file:bg-white file:text-black"
                />
              </div>
              <input
                type="text"
                placeholder="Message"
                className="w-full p-2 border rounded-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Employee To-Do List */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Employee To Do List</h2>
        {employees.map((name, i) => (
          <div key={i} className="mb-6">
            <div className="mb-2 font-semibold">{name}</div>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={taskInput[name] || ''}
                onChange={(e) => setTaskInput({ ...taskInput, [name]: e.target.value })}
                placeholder="New Task"
                className="flex-1 p-2 border rounded-full"
              />
              <button onClick={() => handleSaveTask(name)} className="bg-green-600 text-white px-4 py-1 rounded-full">
                {editingIndex[name] !== undefined ? 'Update' : 'Add'}
              </button>
            </div>

            {/* List all saved tasks */}
            {(todos[name] || []).map((task, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-1">
                <span>{task}</span>
                <button
                  onClick={() => handleEditTask(name, index)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
