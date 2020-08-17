import queryString from 'query-string'

const get = ({ props, key }) => {
    return props.location.search.length > 0
        ? queryString.parse(props.location.search)[key]
        : null
}

export default {
    get,
}
