import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

const resolve = path.resolve

/**
 * get the method 
 */
export function getMethod(request: configRequest): method_enum {
    return request.method
}

/**
 * prepare the url with all the params and query
 */
export function getUrl(request: configRequest): configRequest["url"] {
    let url: configRequest["url"] = request.url

    if (Object.prototype.hasOwnProperty.call(request, 'params')) {
        url = setUrlParam(url, request.params)
    }

    if (Object.prototype.hasOwnProperty.call(request, 'queries')) {
        url = setUrlQuery(url, request.queries)
    }

    return url
}

/**
 * configure the url parameters variable
 */
export function setUrlParam(url: configRequest["url"], params: configRequest["params"]): configRequest["url"] {
    Object.entries(params as object).forEach(([key, val]) => {
        let regex = new RegExp(`(^.+/):${key}$`)
        url = url.replace(regex, "$1" + val as unknown as string)
        regex = new RegExp(`(^.+/):${key}([/?].+)`)
        url = url.replace(regex, "$1" + val as unknown as string + "$2")
    })
    return url
}


/**
 * configgure the url query variable 
 */
export function setUrlQuery(url: configRequest["url"], queries: configRequest["queries"]): configRequest["url"] {
    const data: string[] = []
    Object.entries(queries as object).forEach(([key, val]) => {
        data.push(`${key}=${val}`)
    })

    return url + `?${data.join('&')}`
}

export function getData(request: configRequest): FormData {

    const form = new FormData()

    if (Object.prototype.hasOwnProperty.call(request, 'data')) {
        Object.entries(request.data as object).forEach(([key, val]) => {
            if (fs.existsSync(resolve(val))) {
                form.append(key, fs.createReadStream(resolve(val)))
            } else {
                form.append(key, val)
            }
        })
    }
    return form
}

export function getHeader(config: configRequest): configHeader {
    const defaultHeader = {
        Accept: 'application/json',
        Connection: 'keep-alive',
        "Content-Type": "multipart/form-data",
    }

    if (Object.prototype.hasOwnProperty.call(config, 'headers')) {
        return { ...defaultHeader, ...config.headers }
    }

    return {}
}
