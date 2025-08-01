"use client";
import { useEffect, useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('https://bloopinsight.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query search ($query: String!) {
              search (query: $query, access: "Search") {
                ... on SearchDocuments {
                  total
                  type
                  documents {
                    id
                    parent {
                      id
                      labelOnly
                      path
                      title
                      type
                    }
                    path
                    status
                    summary
                    title
                    type
                  }
                }
              }
            }
          `,
          variables: {
            query: 'test'
          }
        })
      });
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []);

  // render your blog component
};


export default Blog