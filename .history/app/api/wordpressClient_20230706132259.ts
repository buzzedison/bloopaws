const { wordpressClient } = require('./apolloClient');
const { gql } = require('@apollo/client');

const parsePost = (post) => {
  // You can add any logic here to parse the post data
  return post;
};

const findWordpressPost = gql`
  query GetWordPressPost($slug: String!) {
    post: postBy(slug: $slug) {
      title
    }
  }
`;

const getPostBySlug = (slug) => {
  return wordpressClient
    .query({
      query: findWordpressPost,
      variables: {
        slug,
      },
    })
    .then((result) => {
      if (!result.data.post) {
        return null;
      }
      return parsePost(result.data.post);
    });
};

module.exports = { getPostBySlug };
