import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let uri = "/api/graphql";
let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
}
