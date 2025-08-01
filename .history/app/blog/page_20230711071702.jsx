import axios from "axios";

const POSTS_QUERY = `
query NewQuery {
  posts {
    nodes {
      id
      title
      content
    }
  }
}
`;

export default function PostsPage({ data }) {
  // Destructure the data prop from props

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

export async function getServerSideProps(context) {
  // Fetch data from WordPress GraphQL endpoint
  const response = await axios.get("https://bloopinsight.com/graphql", {
    params: { query: POSTS_QUERY },
  });
  const data = response.data;

  // Pass data to the page via props
  return {
    props: { data },
  };
}
