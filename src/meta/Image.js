import config from 'Root/config'

export default ({data, type} = {data: null}) => {
    switch (type) {
        case 'UserProfile':
            return `${config.UPLOAD_URL}${data.user.avatarAddress}`
        case 'WeeshPage':
            return `${config.UPLOAD_URL}${data.weesh.user.avatarAddress}`
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
            return `Weesh • Showcase`
        case 'Login':
            return `Login • Weesh`
        case 'Join':
            return `Join • Weesh`
        default:
            return 'Weesh'
    }
}
