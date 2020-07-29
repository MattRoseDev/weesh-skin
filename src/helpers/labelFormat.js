export default ({ single, plural, number }) => {
    if (number == 1) return `${number} ${single}`
    else return `${number} ${plural}`
}
