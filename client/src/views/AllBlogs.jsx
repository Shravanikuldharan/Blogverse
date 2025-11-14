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
      <div className="bg-[#F0FAFF] mx-auto p-4 pb-6">
        <Navbar />

       <Toaster />

        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No blogs found yet. Create your first one!
          </p>
        ) : (
          blogs.map((blog) => {
            const {
              _id,
              title,
              author,
              updatedAt,
              publishedAt,
              status,
              category,
              slug,
              viewCount,
            } = blog;

            return (
              <BlogCard
                key={_id}
                title={title}
                author={author}
                updatedAt={updatedAt}
                publishedAt={publishedAt}
                status={status}
                category={category}
                slug={slug}
                viewCount={viewCount}
                initialLikes={blog.likes}
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