export default {
    hashtag: /#(\w|_)+/gi,
    mention: /@(\w|_)+/gi,
    url: new RegExp(
        '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?',
        'igm',
    ),
    key: /(\$\$\$___[0123456789abcdefg-]+___\$\$\$)(?!;)/gim,
    leftTrimKey: /^\$\$\$___/gim,
    rightTrimKey: /___\$\$\$$/gim,
}
