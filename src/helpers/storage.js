const get = ({ key }) => {
    let value = localStorage.getItem(key) || false
    return JSON.parse(value)
}

const set = ({ key, value }) => {
    value = JSON.stringify(value)
    return localStorage.setItem(key, value)
}

const remove = ({ key }) => {
    return localStorage.removeItem(key)
}

export default { 
    get,
    set,
    remove
}