declare interface configVariable {
    [key: string]: string | boolean | number
}

declare interface configRequest {
    method: method_enum
    url: string
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

