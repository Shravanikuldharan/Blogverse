import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { BLOG_CATEGORIES } from "./../constants";
import { getCurrentUser } from "./../util";
import { FiFilePlus, FiSave } from "react-icons/fi";

function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0].name);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    setUser(getCurrentUser());
  }, []);

  const saveBlog = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title,
          content,
          category,
          author: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog saved successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="min-h-screen p-4 pb-6 bg-[#F0FAFF]">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold text-[#0077b6] mb-4 tracking-wide flex items-center gap-2">
          <FiFilePlus className="text-[#0077b6]" />
          Create a New Blog
        </h1>

        <div className="bg-white shadow-lg border border-[#D5EFFF] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1">
              <label className="text-gray-700 font-medium block mb-1">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                className="w-full p-3 border border-[#A0E9FF] rounded-lg 
                  focus:ring-2 focus:ring-[#00A9FF] outline-none shadow-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/5">
              <label className="text-gray-700 font-medium block mb-1">
                Blog Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-[#A0E9FF] rounded-lg bg-white 
                  focus:ring-2 focus:ring-[#00A9FF] outline-none shadow-sm"
              >
                {BLOG_CATEGORIES.map((cate, index) => (
                  <option key={cate.name + index} value={cate.name}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-700 font-medium block mb-2">
              Blog Content
            </label>

            <div className="border border-[#A0E9FF] rounded-xl overflow-hidden shadow">
              <MarkdownEditor
                value={content}
                onChange={(value) => setContent(value)}
                height="500px"
              />
            </div>
          </div>

          <div className="flex">
            <button
              onClick={saveBlog}
              className="cursor-pointer bg-gradient-to-r from-[#0077b6] to-[#00b4d8]
                text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl 
                hover:scale-[1.03] transition font-bold flex items-center gap-2"
            >
              <FiSave className="text-xl" />
              Save Blog
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default NewBlog;