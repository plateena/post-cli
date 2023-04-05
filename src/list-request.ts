import chalk from 'chalk'
import * as config from './config-file.js'

export function listRequest(file: string): void {
    const lists = config.getRequestList(file)

    if (lists != false) {
        console.log(chalk.bold.blue("List of available request:"))
        for (const list of lists) {
            console.log('- ' + list);
        }
        console.log("");
        console.log("");
    }
}
