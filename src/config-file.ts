/* eslint-disable @typescript-eslint/indent */
import _ from 'lodash'
import fs from 'fs'
import yaml from 'js-yaml'
import * as validator from './utils/validator.js'

export const loadConfigFile = (path: string, requestName: string): configRequest | false => {
    const isValidFileExt = validator.isValidExtension(path)
    if (!isValidFileExt) {
        return false
    }

    const fileExist = validator.isFileExist(path)
    if (!fileExist) {
        return false
    }

    const config = loadConfigFromYaml(path)
    if (config) {
        const variables = getConfigVariable(config)
        const request = getConfigRequest(config, requestName)
        if (request) {
            const data = populateConfig<configRequest>(request, variables)

            return data
        }
    }

    return false
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
    if (Object.prototype.hasOwnProperty.call(config.request, requestName)) {
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

    if (variables == undefined) {
        return data
    }

    if (typeof data == "object" && data != null) {
        Object.entries(data as object).forEach(([key, value]) => {
            if (data && typeof value == "object") {
                data[key as keyof typeof data] = populateConfig(value, variables)
            } else if (data && typeof value == "string") {
                const regexp = /.*{{(\w+)}}.*/g
                if (/.*{{(\w+)}}.*/g.test(value)) {
                    const matched = value.matchAll(regexp)
                    for (const match of matched) {
                        if (variables[match[1] as keyof configVariable] !== undefined) {
                            const ori: string = data[key as keyof typeof data] as string
                            const newstr = ori.replace(`{{${match[1]}}}`, variables[match[1] as keyof configVariable] as string)
                            data[key as keyof typeof data] = newstr as (T & object)[keyof T]
                        }
                    }
                }
            }
        })

        return data;
    }
    return request
}

export function getRequestList(path: string): string[] | [] | false {
    const isValidFileExt = validator.isValidExtension(path)
    if (!isValidFileExt) {
        return false
    }

    const fileExist = validator.isFileExist(path)
    if (!fileExist) {
        return false
    }

    const config = loadConfigFromYaml(path)

    const data = []
    if (config != false) {
        for (const req in config.request) {
            let str = req
            str += ' - ' + _.get(config.request[req], 'descriptions', 'no description')
            data.push(str)
        }
    }

    return data
}

export default loadConfigFile
