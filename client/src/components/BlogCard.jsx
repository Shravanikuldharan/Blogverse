// import { Link } from "react-router";

// function BlogCard({
//   title,
//   author,
//   publishedAt,
//   updatedAt,
//   status,
//   category,
//   slug,
//   viewCount,
// }) 
// {
//   return (
//     <div className="border p-4 my-4 rounded-md relative">
//       <h2>
//         {status != "published" ? (
//           <span className="bg-yellow-200 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md mr-4">
//             {status}
//           </span>
//         ) : null}

//         {title}
//       </h2>
//       <div className="flex items-center gap-2 my-2">
//         <div className="flex items-center justify-center font-semibold w-[35px] h-[35px] bg-orange-300 text-center text-white rounded-full text-xl">
//           {author.name.substring(0, 1)}
//         </div>

//         <div>
//           <p>{author.name}</p>
//           {/* <p>{author.email}</p> */}
//         </div>
//       </div>
//       <p className="text-sm mt-2">
//         Published On: {new Date(publishedAt || updatedAt).toLocaleString()},
//         Read By {viewCount} people
//       </p>

//       <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
//         {category}
//       </span>

//       {status == "published" ? (
//         <Link
//           className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer"
//           to={`/blog/${slug}`}
//         >
//           Read More
//         </Link>
//       ) : (
//         <Link
//           className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer"
//           to={`/edit/${slug}`}
//         >
//           Edit Blog
//         </Link>
//       )}
//     </div>
//   );
// }

// export default BlogCard;
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function BlogCard({
  title,
  author,
  publishedAt,
  updatedAt,
  status,
  category,
  slug,
  viewCount,
  initialLikes = 0, 
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLiked(response.data.liked);
        setLikeCount(response.data.totalLikes);
      }
    } catch (error) {
      toast.error("You need to log in to like/unlike this blog.");
    }
  };

  return (
    <div className="border p-4 my-4 rounded-md relative hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-bold leading-snug">
          {status !== "published" && (
            <span className="bg-yellow-200 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md mr-2">
              {status}
            </span>
          )}
          {title}
        </h2>

        {/* Like Icon */}
        <div className="flex items-center gap-40">
          <button
            onClick={toggleLike}
            className="focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
            title={liked ? "Unlike this blog" : "Like this blog"}
          >
            {liked ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl hover:text-red-400" />
            )}
          </button>
          <span className="text-sm text-gray-600 select-none">{likeCount}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 my-2">
        <div className="flex items-center justify-center font-semibold w-[35px] h-[35px] bg-orange-300 text-center text-white rounded-full text-xl">
          {author.name.substring(0, 1)}
        </div>

        <div>
          <p className="font-medium">{author.name}</p>
        </div>
      </div>

      <p className="text-sm mt-2">
        Published On: {new Date(publishedAt || updatedAt).toLocaleString()} •{" "}
        {viewCount} views
      </p>

      <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
        {category}
      </span>

      {status === "published" ? (
        <Link
          className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer hover:bg-gray-800 transition"
          to={`/blog/${slug}`}
        >
          Read More
        </Link>
      ) : (
        <Link
          className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer hover:bg-gray-800 transition"
          to={`/edit/${slug}`}
        >
          Edit Blog
        </Link>
      )}
    </div>
  );
}

export default BlogCard;
