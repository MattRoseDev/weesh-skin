const get = ({ key }) => {
    let value = localStorage.getItem(key) || false
    return JSON.parse(value)
}

const set = ({ key, value }) => {
    value = JSON.stringify(value)
    return localStorage.setItem(key, value)
}

export default { 
    get,
    set
}