#!/usr/bin/env node
import greetings from './greetings.js'
import * as config from './config-file.js'
import { Command } from 'commander'
import * as validator from './utils/validator.js'
import * as req from './make-request.js'

const program = new Command()

greetings()

program
    .name('post-cli')
    .description('cli version of postman')
    .argument('<testName>', 'the test name under request')
    .argument('[fileName]', 'name of the config file without yaml extension')
    .version('v1.0', '-v, --version', 'output the current verions')
    .action(async (testName, fileName) => {
        let file = './workspace/default.yaml'
        if (fileName) {
            file = fileName
        }

        const rs = config.loadConfigFile(file, testName)

        if (typeof rs == 'object') {
            console.error(validator.isValidURL(rs.url));
            const res = await req.process(rs)
            console.log(res);
            
        }

        console.log(rs);
    })

program.parse()

console.log("hello");



    // const conf = configFile()


