import { useFetch } from "next/data";
import { ReactServerComponent } from "react";

export default function PostsPage(): ReactServerComponent {
  // Use the useFetch hook to get the data
  const { data, error } = useFetch("/api/posts");

  // Handle loading and error states
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

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
