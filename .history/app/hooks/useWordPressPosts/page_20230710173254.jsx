import axios from "axios";
import { useState, useEffect } from "react";

const POSTS_QUERY = `
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

export async function useWordPressPosts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const response = await axios.get("https://example.com/graphql", {
        params: { query: POSTS_QUERY },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setError("Network error");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Unknown error: ${error.message}`);
      }
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}
