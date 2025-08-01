import Image from "next/image"

async function getPost() {
  const query = `
    query {
      posts {
        nodes {
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          id
          title
          excerpt
        }
      }
    }
  `;

  try {
    const response = await fetch('https://bloopinsight.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error('Error fetching data:', response.status, response.statusText);
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log('Received data:', jsonResponse);

    if (!jsonResponse.data) {
      console.error('Error: Data object is undefined');
      throw new Error('Data object is undefined');
    }

    return jsonResponse.data.posts.nodes;
  } catch (error) {
    console.error('Error in getPost:', error);
    throw error;
  }
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
            {post.featuredImage && post.featuredImage.node ? (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || 'Featured image'}
                className="w-full h-48 object-cover mb-4 rounded"
                width={200} height={100}
              />
            ) : null}
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}