#!/usr/bin/env node
import greetings from "./greetings"
import configFile from "./config-file"
import { Command } from 'commander'

const cli = async () => {
    const program = new Command()

    greetings()

    program
        .name('post-cli')
        .description('cli version of postman')
        .argument('<filename>', 'name of the config file without yaml extension')
        .version('v1.0', '-v, --version', 'output the current verions');

    program.parse()

    // const conf = configFile()
}

export default cli