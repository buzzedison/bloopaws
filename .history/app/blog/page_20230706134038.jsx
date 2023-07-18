import { getStaticProps as _getStaticProps } from 'next';
import { getPostBySlug } from '../../api/wordpressClient';

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const post = await getPostBySlug(slug);
  return {
    props: {
      post,
    },
  };
}

const PostPage = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      {/* Render other post fields here */}
    </div>
  );
};

export default PostPage;