import { Link } from "react-router";

function BlogCard({
  title,
  author,
  publishedAt,
  updatedAt,
  status,
  category,
  slug,
  viewCount,
}) 
{
  return (
    <div className="border p-4 my-4 rounded-md relative">
      <h2>
        {status != "published" ? (
          <span className="bg-yellow-200 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md mr-4">
            {status}
          </span>
        ) : null}

        {title}
      </h2>
      <div className="flex items-center gap-4 my-2">
        <div className="flex items-center justify-center font-semibold w-[50px] h-[50px] bg-orange-300 text-center text-white rounded-full text-3xl">
          {author.name.substring(0, 1)}
        </div>

        <div>
          <p>{author.name}</p>
          <p>{author.email}</p>
        </div>
      </div>
      <p className="text-sm mt-2">
        Published On: {new Date(publishedAt || updatedAt).toLocaleString()},
        Read By {viewCount} people
      </p>

      <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
        {category}
      </span>

      {status == "published" ? (
        <Link
          className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer"
          to={`/blog/${slug}`}
        >
          Read More
        </Link>
      ) : (
        <Link
          className="bg-gray-700 text-white px-6 py-2 rounded-md absolute bottom-4 right-4 cursor-pointer"
          to={`/edit/${slug}`}
        >
          Edit Blog
        </Link>
      )}
    </div>
  );
}

export default BlogCard;