import React, { useState } from "react";

export default function AdminSettings() {
  const [form, setForm] = useState({
    name: "Jon Doe",
    email: "jon.doe@example.com",
    role: "Admin",
    notifications: true,
    darkMode: false,
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file (jpg, png)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Admin Settings</h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
            <img
              src={preview || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-2">Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg shadow-sm"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg shadow-sm"
            />
          </div>

          {/* Role */}
          <input
            value={form.role}
            disabled
            className="w-full p-3 border bg-gray-100 rounded-lg text-gray-500"
          />

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full p-3 border rounded-lg shadow-sm"
            />
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg shadow-sm"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
              />
              Enable Notifications
            </label>
          
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
