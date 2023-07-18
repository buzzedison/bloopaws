import { ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = process.env.WP_URL;

export const wordpressClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});
