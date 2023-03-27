import path from 'path'
import fs from 'fs'

export function isValidURL(str: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export function isFileExist(path: string): boolean {
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

export function isValidExtension(file: string): boolean {
    if (['.yaml', '.yml'].includes(path.extname(file))) {
        return true
    } else {
        console.error(`${file} is invalid. Please provide yaml or yml file extension.`)
        return false
    }
}
