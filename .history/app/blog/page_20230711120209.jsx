

async function getPost(){
  const response = await fetch("https://bloopinsight.com/wp-json/wp/v2/posts")
  const data= await response.json()
  return data
}
export default function Page() {
  // Use the blogposts route handler to fetch the data
  const data = use(fetch("/app/api/blogposts"));
  // Render the blog posts in a grid layout
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Blog Posts</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold truncate">{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        ))}
      </div>
    </div>
  );
}