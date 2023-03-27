export function getMethod(request: configRequest): method_enum {
    return request.method
}

export function getUrl(request: configRequest): configRequest["url"] {
    let url: configRequest["url"] = request.url

    if (Object.prototype.hasOwnProperty.call(request, 'params')) {
        url = setUrlParam(request.url, request.params)
    }

    return url
}

export function setUrlParam(url: configRequest["url"], params: configRequest["params"]): configRequest["url"] {
    Object.entries(params as object).forEach(([key, val]) => {
        let regex = new RegExp(`(^.+/):${key}$`)
        url = url.replace(regex, "$1" + val as unknown as string)
        regex = new RegExp(`(^.+/):${key}([/?].+)`)
        url = url.replace(regex, "$1" + val as unknown as string + "$2")
    })
    return url
}

