import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});

  const fetchBlog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}`
    );
    setBlog(response.data.data);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    fetchBlog();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>

      <p>
        Published On:{" "}
        {new Date(blog.publishedAt || blog.updatedAt).toLocaleString()}, Read by{" "}
        {blog.viewCount} people
      </p>

      <div className="flex items-center mb-4">
        <span className="text-xl bg-orange-400 px-4 py-1 rounded-full text-white">
          {blog.category}
        </span>

        <div className="flex items-center gap-4 my-2 ml-14">
          <div className="flex items-center justify-center font-semibold w-[50px] h-[50px] bg-orange-300 text-center text-white rounded-full text-3xl">
            {blog?.author?.name?.substring(0, 1)}
          </div>

          <div>
            <p>{blog?.author?.name}</p>
            <p>{blog?.author?.email}</p>
          </div>
        </div>
      </div>
      <MarkdownEditor.Markdown source={blog.content} />
    </div>
  );
}

export default ReadBlog;