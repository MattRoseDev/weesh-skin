import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import config from 'Root/config'
import helpers from 'Root/helpers'

const { storage } = helpers

const cache = new InMemoryCache()

const uploadLink = new createUploadLink({
    uri: `${config.API_URL}`,
})

const wsLink = new WebSocketLink({
    uri: `${config.WS_URL}`,
    options: {
        reconnect: true
    }
})

const httpLink = new HttpLink({
    uri: `${config.API_URL}`,
    headers: {
        token: storage.get({ key: 'token' })
    }
})

const authLink = setContext((_, { headers }) => {
    const token = storage.get({ key: 'token' })

    return {
        headers: {
            ...headers,
            token: token || '',
        }
    }
})

const terminatingLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return (
            kind === 'OperationDefinition' && operation === 'subscription'
        )
    },
    wsLink,
)

const client = new ApolloClient({
    link: ApolloLink.from([terminatingLink, authLink, uploadLink]),
    cache,
})

export default client