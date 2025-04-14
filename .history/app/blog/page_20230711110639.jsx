

export default function Insight (){
  const data = use(fetch("/app/api/blogposts"));
  // Render the blog posts
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}