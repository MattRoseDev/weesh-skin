export default ({ data, type } = { data: null }) => {
    switch (type) {
        case 'UserProfile':
            return `${data.user.followers.paginate.totalDocs} followers, ${data.user.following.paginate.totalDocs} following, ${data.user.weesh.paginate.totalDocs} weeshes - ${data.user.bio}`
        case 'WeeshPage':
            return `${data.weesh.content.substr(0, 160).replace(/\n/gi, ' ')}`
        default:
            return 'Have you ever written your wishes? We can keep your wishes and help you achieve them sooner. Join us and share your wishes private or public.'
    }
}
