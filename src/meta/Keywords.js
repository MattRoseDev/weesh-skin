export default ({ data, type } = { data: null }) => {
    let keywords = [
        'weesh',
        'dream',
        'dreams',
        'wish',
        'wishes',
        'goal',
        'goals',
        'target',
        'purpose',
        'imagine',
    ]
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
        case 'Showcase':
            return keywords.join(',')
        case 'Login':
            keywords.push('login')
            keywords.push('sign in')
            return keywords.join(',')
        case 'Join':
            keywords.push('join')
            keywords.push('sign up')
            return keywords.join(',')
        default:
            return keywords.join(',')
    }
}
