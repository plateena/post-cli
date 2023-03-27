/* eslint-disable @typescript-eslint/indent */
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

enum method_enum {
    "POST",
    "GET",
    "PUT",
    "DELETE",
}

type configVariable = {
    [key: string]: string | boolean | number
}

type configRequest = {
    method: method_enum,
    url: string,
}

type configFile = {
    variables: configVariable,
    request: {
        [key: string]: configRequest
    }
}

export const loadConfigFile = (path: string) => {
    const isValidFileExt = isValidExtension(path)
    if (!isValidFileExt) {
        return false
    }

    const fileExist = isFileExist(path)
    if (!fileExist) {
        return false
    }
}

export const isFileExist = (path: string): boolean => {
    try {
        if (fs.existsSync(path)) {
            return true
        } else {
            console.error(`File ${path} not exist. Please provide a valid file path.`)
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

export const isValidExtension = (file: string): boolean => {
    if (['.yaml', '.yml'].includes(path.extname(file))) {
        return true
    } else {
        console.error(`${file} is invalid. Please provide yaml or yml file extension.`)
        return false
    }
}

export const loadConfigFromYaml = (path: string): configFile | false => {
    try {
        const doc: configFile = yaml.load(fs.readFileSync(path, 'utf8')) as configFile
        return doc
    } catch (err) {
        console.error(err)
        return false
    }
}

export const getConfigRequest = (config: configFile, requestName: string): configRequest | false => {
    if (config.request.hasOwnProperty(requestName)) {
        return config.request[requestName as keyof typeof config]
    } else {
        console.error(`Request name ${requestName} can't be found. Make sure you have create the request in the yaml file.`);
        return false
    }
}

export const getConfigVariable = (config: configFile): configVariable => {
    return config['variables']
}

export const populateConfig = <T>(request: T, variables: configVariable): T => {
    const data = request

    if (typeof data == "object" && data != null) {
        Object.entries(data as object).forEach(([key, value]) => {
            if (data && typeof value == "object") {
                data[key as keyof typeof data] = populateConfig(value, variables)
            } else if (data && typeof value == "string") {
                const regexp = /.*{{(\w+)}}.+/g
                if (/.*{{(\w+)}}.+/g.test(value)) {
                    const matched = value.matchAll(regexp)
                    for (const match of matched) {
                        let ori: string = data[key as keyof typeof data] as string
                        let newstr = ori.replace(`{{${match[1]}}}`, variables[match[1] as keyof configVariable] as string)
                        data[key as keyof typeof data] = newstr as (T & object)[keyof T]
                    }
                }
            }
        })

        return data;
    } else {
        return request
    }
}

export default { loadConfigFile }
