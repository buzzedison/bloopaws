"use client"
import { useWordPressPosts } from "../hooks/useWordPressPosts";

export default function PostsPage() {
  // Use the custom hook to get the data
  const { data, loading, error } = useWordPressPosts();

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render the posts
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.posts && data.posts.nodes.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
