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

type configFile = {
    variable: {
        base_url?: string
    },
    request: {
        [key: string]: {
            method: method_enum,
            url: string,
        }
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

export const populateConfig = (config: configFile): configFile => {
    const data: configFile = config
    Object.entries(data).forEach(([key, value]) => {
        console.log(`${key} : ${value}`);
    })
    return data;
}

export default { loadConfigFile }
