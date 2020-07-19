export default ({ data, type } = { data: null }) => {
    switch (type) {
        case 'UserProfile':
            return `${data.user.firstName || ''} ${
                data.user.lastName || ''
            } (@${data.user.username}) | Weesh`
        case 'WeeshPage':
            return `${data.weesh.user.firstName || ''} ${
                data.weesh.user.lastName || ''
            } (@${data.weesh.user.username}) | Weesh`
        case 'Tags':
            return `#${data.tag} | Weesh`
        case 'EditProfile':
            return `Edit Profile | Weesh`
        case 'AddWeesh':
            return `Add | Weesh`
        case 'EditWeesh':
            return `Edit | Weesh`
        case 'Support':
            return `Support | Weesh`
        case 'Bookmarks':
            return `Bookmarks | Weesh`
        case 'Showcase':
            return `Weesh | Change Your Destiny`
        case 'Login':
            return `Weesh | Login`
        case 'Join':
            return `Weesh | Join`
        default:
            return 'Weesh | Change Your Destiny'
    }
}
