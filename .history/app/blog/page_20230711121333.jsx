

async function getPost() {
  const NewQuery = `
    query {
      posts {
        nodes {
          id
          title
          content
        }
      }
    }
  `;

  const response = await fetch('https://bloopinsight.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ NewQuery }),
  });

  const { data } = await response.json();
  return data.posts.nodes;
}
export default async function Insight() {
  const blog = await getPost();

  // Render the blog posts
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blog.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold mb-4">{post.title.rendered}</h2>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}