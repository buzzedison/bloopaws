import axios from "axios";
import { useState, useEffect } from "react";

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

export function useWordPressPosts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function
    async function fetchData() {
      try {
        const response = await axios.get("https://bloopinsight.com/graphql", {
          params: { query: POSTS_QUERY },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error as before
      }
    }
    // Call the async function
    fetchData();
  }, []);

  return { data, loading, error };
}
