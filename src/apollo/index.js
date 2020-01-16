import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import config from 'Root/config'
import helpers from 'Root/helpers'

const { storage } = helpers

const cache = new InMemoryCache()

const httpLink = new HttpLink({
    uri: `${config.API_URL}`,
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

const client = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
})

export default client