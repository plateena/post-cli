#!/usr/bin/env node
import greetings from './greetings.js'
import config from './config-file.js'
import { Command } from 'commander'

const cli = async () => {
    const program = new Command()

    greetings()

    program
        .name('post-cli')
        .description('cli version of postman')
        .argument('[filename]', 'name of the config file without yaml extension')
        .version('v1.0', '-v, --version', 'output the current verions')

  program.action((filename) => {
        let file = 'dafault'
        if (filename) {
            file = filename
        }

        config.loadConfigFile(file)
    })

    program.parse()

    // const conf = configFile()
}

cli()

export default cli
