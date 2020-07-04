export default ({ error }) => {
    return error.graphQLErrors[0].message == 'Authentication Failed'
}
