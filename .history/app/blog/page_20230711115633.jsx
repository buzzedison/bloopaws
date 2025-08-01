

async function getPost(){
  const response = await fetch("https://bloopinsight.com/wp-json/wp/v2/posts")
  const data= await response.json()
  return data
}
export default async function Insight (){
  const blog = await getPost()
  console.log(blog)
  // Render the blog posts
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blog.map((post) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}