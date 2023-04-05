import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { exec } from 'child_process'
import { AxiosResponse } from 'axios'

export function writeResult(filepath: string, res: AxiosResponse) {
    const dirname = path.dirname(path.resolve(filepath))
    const file = path.resolve(filepath)

    // check if dir exist
    if (!fs.existsSync(dirname)) {
        throw new Error(`The output directory '${dirname}' does not exists.`)
    }

    // check if has access
    try {
        fs.accessSync(dirname, fs.constants.W_OK)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }

    fs.writeFileSync(file, JSON.stringify(_.pick(res, ['config.headers', 'config.url', 'config.method', 'status', 'statusText', 'data'])), 'utf8')

    exec(`${path.resolve('./node_modules/prettier/bin-prettier.js')} --write ${file}`, (error) => {
        if (error) {
            throw new Error(`error: ${error.message}`);
        }
    })
}
