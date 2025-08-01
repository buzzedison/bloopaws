"use client"

import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Blog;