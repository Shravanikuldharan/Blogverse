import Blog from "./../models/Blog.js";

const postBlogs = async (req, res) => {
    const { title, category, content, author } = req.body;

    if (!title || !category || !content || !author) {
        return res.status(400).json({
            success: false,
            message: "All fileds are requires",
        });
    }

    const newBlog = new Blog({
        title,
        category,
        content,
        author,
        slug: `temp-slug-${Date.now()}-${Math.random().toString()}`
    });

    const savedBlog = await newBlog.save();

    savedBlog.slug = `${title.toLowerCase().replace(/ /g, "-")}-${savedBlog._id
        }`.replace(/[^\w-]+/g, "");

    await savedBlog.save();

    res.status(201).json({
        success: true,
        message: "Blog ceated successfully!",
        blog: savedBlog,
    })
};

export { postBlogs };