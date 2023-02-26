export function getAccessTokens() {
    const accessToken = sessionStorage.getItem('accessToken')
    return accessToken;
}

export function getType(value, body) {
    if(value.params) {
        return {
            params: body
        }
    } else if(value.query) {
        if(typeof body === 'object') {
            return {
                query: body._id
            }
        } else {
            return {
                query: body
            }
        }
    }

    return {};
}

export function elipse(text, length) {
    if(text.length > length) {
        return text.substring(0, length) + "....."
    }
    else {
        return text
    }
}