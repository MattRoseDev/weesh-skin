export default ({ data, type } = { data: null }) => {
    switch (type) {
        case 'UserProfile':
            return `${data.user.firstName || ''} ${data.user.lastName || ''} (@${data.user.username}) • Weesh`
        case 'WeeshPage':
            return `${data.weesh.content.substr(0, 160).replace(/\n/ig,' ')}`
        case 'Tags':
            return `#${data.tag} • Weesh`
        case 'EditProfile':
            return `Edit Profile • Weesh`
        case 'AddWeesh':
            return `Add • Weesh`
        case 'Support':
            return `Support • Weesh`
        case 'Bookmarks':
            return `Bookmarks • Weesh`
        case 'Showcase':
            return `Weesh`
        case 'Login':
            return `Login • Weesh`
        case 'Join':
            return `Join • Weesh`
        default:
            return 'Weesh'
    }
}