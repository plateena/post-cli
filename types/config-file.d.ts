declare interface configVariable {
    [key: string]: string | boolean | number
}

declare interface configRequest<T = string> {
    method: method_enum
    url: string
    params?: {
        [key: string]: string | boolean | number
    }
    queries?: {
        [key: string]: string
    }
    data?: {
        [key: string]: string | boolean | number | Array<T>
    } | never[]
}

declare interface configFile {
    variables: configVariable,
    request: {
        [key: string]: configRequest
    }
}

declare enum method_enum {
    "POST",
    "GET",
    "PUT",
    "DELETE",
}
