#!/usr/bin/env node
import greetings from './greetings.js'
import * as config from './config-file.js'
import { Command } from 'commander'
import * as validator from './utils/validator.js'
import * as req from './make-request.js'
// import boxen from "boxen"
import _ from 'lodash'
import { generateTitle } from './utils/title.js'

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

        // load the config
        const rs = config.loadConfigFile(file, testName)

        if (typeof rs == 'object') {
            // check if the url is valid
            if (validator.isValidURL(rs.url)) {
                console.error(`${rs.url} is not a valid url`)
            }

            const res = await req.process(rs)

            generateTitle(" Request ")
            console.log(rs)

            if ('response' in res) {
                generateTitle(" Response ")
                console.log(_.pick(res.response, ['status', 'statusText', 'data']))
            } else {
                generateTitle(" Error ")
                console.log(res)
            }
        }
    })

program.parse()



    // const conf = configFile()


