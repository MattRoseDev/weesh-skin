export default date => {
    let types = [
        {
            type: /a few seconds/,
            label: 'now',
        },
        {
            type: /an |a /,
            label: '1',
        },
        {
            type: /minutes|minute/,
            label: 'm',
        },
        {
            type: /month/,
            label: 'mo',
        },
        {
            type: /months/,
            label: 'mos',
        },
        {
            type: /hours|hour/,
            label: 'h',
        },
        {
            type: /days|day/,
            label: 'd',
        },
        {
            type: /years|year/,
            label: 'y',
        },
        {
            type: / /,
            label: '',
        },
    ]

    types.forEach(item => {
        date = date.replace(item.type, item.label)
    })

    return date
}
