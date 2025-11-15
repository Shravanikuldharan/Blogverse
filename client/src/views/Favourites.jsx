import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";
import emptyFav from "../assets/fav.png";
import { fetchWithCache } from "../utils/apiCache.js";
import Footer from "../components/Footer.jsx";

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

      const response = await fetchWithCache(
        `${import.meta.env.VITE_API_URL}/blogs`,
        "cache_allblogs"
      );
      const allBlogs = response.data || [];

      // filter only liked blog
      const likedBlogs = allBlogs.filter((b) =>
        favorites.some(
          (f) => f.toLowerCase() === b.slug.toLowerCase()
        )
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
    <>
      <div className="container mx-auto p-4">
        <Navbar />

        {blogs.length === 0 ? (
          <div className="text-center">
            <img src={emptyFav} className="w-100 m-auto mb-[-50px]" />

            <p className="text-gray-500 text-lg">
              You haven’t liked any blogs yet. <br />
              Click the ❤️ icon on a blog to add it here.
            </p>
          </div>
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
      <Footer />
    </>
  );
}

export default Favorites;