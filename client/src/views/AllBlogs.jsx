import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getCurrentUser } from "./../util.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ""}`
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  useEffect(() => {
    if (user) {
      toast.success(`Hello ${user.name}! 👋`, {
        duration: 5000,
        position: "top-center",
      });
    }
  }, [user]);

  return (
    <>
      <div className="bg-[#F0FAFF] min-h-screen flex flex-col mx-auto p-4 pb-6">
        <Navbar />

        <Toaster />

        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center mt-30">
            No blogs found yet. Create your first one!
          </p>
        ) : (
          blogs.map((blog) => {
            return (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                author={blog.author}
                updatedAt={blog.updatedAt}
                publishedAt={blog.publishedAt}
                status={blog.status}
                category={blog.category}
                slug={blog.slug}
                viewCount={blog.viewCount}
                initialThumbLikes={blog.thumbLikes}
              />
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
}

export default AllBlogs;