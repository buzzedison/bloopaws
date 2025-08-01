import Image from 'next/image';
import Link from 'next/link';

async function getPost() {
  // ... The rest of the getPost function
}

function BlogPost() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPosts() {
      const data = await getPost();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  // Render the blog posts
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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
            <Link href={`/blog/${post.uri}`}>
              <a>Learn more</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPost;