export function getMethod(request: configRequest): method_enum {
    return request.method
}

export function getUrl(request: configRequest): string {
    return request.url
}

