import weesh from "./weesh"

export default {
    weesh,
    notification: /(\$\$[0-9a-zA-Z_]+\$\$)(?!;)/gim,
}
