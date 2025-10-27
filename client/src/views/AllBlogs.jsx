import React from 'react'
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../util';

function AllBlogs() {
  const [ user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>

      { user? `Hello ${user.name}!` : `Welcome Guest!`}
    </div>
  )
}

export default AllBlogs;