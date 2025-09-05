import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});