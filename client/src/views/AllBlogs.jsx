import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getCurrentUser } from "./../util";
import Navbar from "../components/Navbar";

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

  return (
    <div className="container mx-auto p-4">
      <Navbar />

      {user && (
        <h2 className="text-lg text-gray-700 font-medium mb-6">
          Hello, <span className="font-semibold">{user.name}</span> 👋
        </h2>
      )}

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
  );
}

export default AllBlogs;