import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

export function isValidURL(str: string): boolean {
    try {
        new URL(str)
        return true
    } catch (error) {
        console.error(chalk.red(`ERROR: ${str} is not a valid url`))
        return false
    }
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
