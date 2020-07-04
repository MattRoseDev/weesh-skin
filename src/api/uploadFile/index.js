import gql from 'graphql-tag'

const single = gql`
    mutation singleUpload($file: Upload!, $type: String!) {
        singleUpload(file: $file, type: $type) {
            filePath
        }
    }
`

export default {
    single,
}
