import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";

function Favorites() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to log in to view favorites.");
        setLoading(false);
        return;
      }

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      const allBlogs = response.data.data || [];

      const likedBlogs = allBlogs.filter((b) =>
        favorites.some((f) => f.toLowerCase() === b.slug.toLowerCase())
      );

      setBlogs(likedBlogs);
    } catch (error) {
      console.error("Error loading favorites:", error);
      toast.error("Failed to load favorite blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading your favorites...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Favorite Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven’t liked any blogs yet. Click the ❤️ icon on a blog to add it here.
        </p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            _id={blog._id}
            title={blog.title}
            author={blog.author}
            publishedAt={blog.publishedAt}
            updatedAt={blog.updatedAt}
            status={blog.status}
            category={blog.category}
            slug={blog.slug}
            viewCount={blog.viewCount}
            initialLikes={blog.likes}
          />
        ))
      )}
    </div>
  );
}

export default Favorites;