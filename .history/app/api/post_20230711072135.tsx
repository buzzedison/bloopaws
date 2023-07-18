import type { NextApiRequest, NextApiResponse } from "next";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch data from WordPress GraphQL endpoint
  const response = await axios.get("https://bloopinsight.com/graphql", {
    params: { query: POSTS_QUERY },
  });
  const data = response.data;

  // Return the data as JSON
  res.status(200).json(data);
}
