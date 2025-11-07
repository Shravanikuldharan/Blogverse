import Blog from "../models/Blog.js";
import Comment from "../models/Comments.js";


const postCommentBySlug = async (req, res) => {
  const { slug } = req.params;
  const { user } = req;
  const { content } = req.body;

  const blog = await Blog.findOne({ slug });
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
  const comment = new Comment({
    content,
    user: user.id,
    blog: blog._id,
  });

  await comment.save();

  if (comment) {
    res.json({
      success: true,
      message: "Your comment added successfully",
      comment,
    });
  }
};

const getCommentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comments = await Comment.find({ blog: blog._id })
      .populate("user", "name email") 
      .populate("blog", "title slug") 
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching comments",
      error: error.message,
    });
  }
};

export { postCommentBySlug, getCommentBySlug };