import React, { useState } from "react";
import { FaPaperclip, FaTag, FaLock, FaUnlock, FaUserAlt } from "react-icons/fa";

export default function CreatePostDashboard() {
  const [postContent, setPostContent] = useState("");
  const [tags, setTags] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [employeeInfo] = useState({
    name: "John Doe",
    role: "Software Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder URL
  });

  const handlePostContentChange = (e) => setPostContent(e.target.value);
  const handleTagChange = (e) => setTags(e.target.value);

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handlePostVisibility = () => {
    setVisibility((prevState) => (prevState === "public" ? "private" : "public"));
  };

  const handleSubmitPost = () => {
    // Handle post submission logic (e.g., save to a database or state)
    alert("Post Submitted!");
    // Reset the form after submission
    setPostContent("");
    setTags("");
    setAttachment(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        {/* Employee Info */}
        <div className="flex items-center mb-6">
          <img src={employeeInfo.avatarUrl} alt="Employee Avatar" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-semibold">{employeeInfo.name}</h2>
            <p className="text-gray-500">{employeeInfo.role}</p>
          </div>
        </div>

        {/* Post Content */}
        <textarea
          value={postContent}
          onChange={handlePostContentChange}
          placeholder="Share an update about your work..."
          rows="5"
          className="w-full p-4 border rounded-lg mb-4 shadow-sm"
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

        {/* Attach File */}
        <div className="flex items-center mb-4">
          <label htmlFor="fileUpload" className="flex items-center cursor-pointer text-blue-600">
            <FaPaperclip className="mr-2" />
            {attachment ? attachment.name : "Attach a file"}
          </label>
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleAttachmentChange}
          />
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

        {/* Submit Button */}
        <button
          onClick={handleSubmitPost}
          disabled={!postContent.trim()}
          className={`w-full py-3 rounded-lg text-white ${postContent.trim() ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"} hover:bg-blue-700`}
        >
          Post Update
        </button>
      </div>
    </div>
  );
}
