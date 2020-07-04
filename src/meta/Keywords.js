export default ({data, type} = {data: null}) => {
    let keywords = ['weesh']
    switch (type) {
        case 'UserProfile':
            data.user.firstName && keywords.push(data.user.firstName)
            data.user.lastName && keywords.push(data.user.lastName)
            data.user.username && keywords.push(data.user.username)
            return keywords.join(',')
        case 'WeeshPage':
            data.weesh.user.firstName &&
                keywords.push(data.weesh.user.firstName)
            data.weesh.user.lastName && keywords.push(data.weesh.user.lastName)
            data.weesh.user.username && keywords.push(data.weesh.user.username)
            return keywords.join(',')
        case 'Tags':
            keywords.push(`#${data.tag}`)
            keywords.push(data.tag)
            return keywords.join(',')
        case 'EditProfile':
            return 'weesh'
        case 'AddWeesh':
            return 'weesh'
        case 'Support':
            return 'weesh'
        case 'Bookmarks':
            return 'weesh'
        case 'Showcase':
            return 'weesh'
        case 'Login':
            return 'weesh,login,sign in'
        case 'Join':
            return 'weesh,join,sign up'
        default:
            return 'weesh'
    }
}
