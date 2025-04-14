"use client";
import React from "react";
import { useWordPressPosts } from "../hooks/useWordPressPosts";

export default function Home() {
  const { data, loading, error } = useWordPressPosts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.posts.nodes.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
