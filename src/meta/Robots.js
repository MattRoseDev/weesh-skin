export default ({ data, type } = { data: null }) => {
    switch (type) {
        case "UserProfile":
            return "index, follow"
        case "WeeshPage":
            return "index, follow"
        case "Tags":
            return "index, follow"
        case "Showcase":
            return "index, follow"
        case "Login":
            return "index, follow"
        case "Join":
            return "index, follow"
        default:
            return "noindex, nofollow"
    }
}
