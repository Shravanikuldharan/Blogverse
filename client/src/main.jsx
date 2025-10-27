import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AllBlogs from './views/AllBlogs'
import NewBlog from './views/NewBlog'
import EditBlog from './views/EditBlog'
import ReadBlog from './views/ReadBlog'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:slug" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> */}
      <Route
        path="*"
        element={<h1 className="text-center mt-5">404 Not Found</h1>}
      />
    </Routes>
  </BrowserRouter>

)