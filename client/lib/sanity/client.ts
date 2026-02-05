import {GraphQLClient} from 'graphql-request'

export const graphqlClient = new GraphQLClient(process.env.SANITY_GRAPHQL_URL!)