const ApolloClient = require('apollo-boost').default;
const { InMemoryCache } = require('apollo-cache-inmemory');
require('cross-fetch/polyfill');

const httpUrl = 'http://localhost:3000/graphql';

const client = new ApolloClient({
    request: operation => {
        const { token } = operation.getContext();

        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        });
    },
    uri: httpUrl,
    cache: new InMemoryCache()
});

module.exports = client;