import { useQuery, gql } from '@apollo/client';
import { wordpressClient } from '../api/client';

const POSTS_QUERY = gql`
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

export default function Home() {
  const { loading, error, data } = useQuery(POSTS_QUERY, {
    client: wordpressClient,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.posts.nodes.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
