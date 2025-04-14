import Image from 'next/image';


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
            uri
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

export default function BlogPost({  }) {
  // Render the blog post
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      {post.featuredImage && post.featuredImage.node ? (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || 'Featured image'}
          className="w-full h-48 object-cover mb-4 rounded"
          width={200}
          height={100}
        />
      ) : null}
      <div
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
