import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { BLOG_CATEGORIES } from "./../constants";
import { FiEdit3, FiSave, FiUploadCloud } from "react-icons/fi";

function EditBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0].name);

  const { slug } = useParams();

  const loadBlog = async () => {
    if (!slug) return;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}`
    );

    const blogData = response?.data?.data;

    setTitle(blogData?.title);
    setContent(blogData?.content);
    setCategory(blogData?.category);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlog();
  }, []);

  const updateBlog = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        { title, content, category },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog updated successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating blog");
    }
  };

  const publishBlog = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog published successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error publishing blog");
    }
  };

  return (
    <div className="p-4 pb-6 min-h-screen bg-[#F0FAFF]">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold text-[#0077b6] mb-4 tracking-wide flex items-center gap-2">
          <FiEdit3 className="text-[#0077b6]" />
          Edit Blog
        </h1>

        <div className="bg-white shadow-lg border border-[#D5EFFF] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1">
              <label className="text-gray-700 font-medium block mb-1">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Update blog title..."
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

          <div className="flex justify-between pt-4">
            <button
              onClick={updateBlog}
              className="cursor-pointer bg-gradient-to-r from-[#0077b6] to-[#00b4d8]
                text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl 
                hover:scale-[1.03] transition font-bold flex items-center gap-2"
            >
              <FiSave className="text-xl" />
              Save Changes
            </button>

            <button
              onClick={publishBlog}
              className="cursor-pointer bg-gradient-to-r from-[#28A745] to-[#7DFFB2]
                text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl 
                hover:scale-[1.03] transition font-bold flex items-center gap-2"
            >
              <FiUploadCloud className="text-xl" />
              Publish
            </button>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default EditBlog;