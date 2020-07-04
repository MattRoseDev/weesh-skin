export default ({data, type} = {data: null}) => {
    switch (type) {
        case 'UserProfile':
            return `${data.user.firstName || ''} ${
                data.user.lastName || ''
            } (@${data.user.username}) • Weesh`
        case 'WeeshPage':
            return `${data.weesh.content.substr(0, 160).replace(/\n/gi, ' ')}`
        case 'Tags':
            return `#${data.tag} • Weesh`
        case 'EditProfile':
            return `Weesh`
        case 'AddWeesh':
            return `Weesh`
        case 'Support':
            return `Weesh`
        case 'Bookmarks':
            return `Weesh`
        case 'Showcase':
            return `What Do You Want?!`
        case 'Login':
            return `Log In to Weesh`
        case 'Join':
            return `Join Us`
        default:
            return 'Weesh'
    }
}
