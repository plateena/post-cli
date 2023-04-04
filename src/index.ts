#!/usr/bin/env node
import greetings from './greetings.js'
import * as config from './config-file.js'
import { Command } from 'commander'
import * as validator from './utils/validator.js'
import * as req from './make-request.js'
// import boxen from "boxen"
import _ from 'lodash'
import util from 'util'
import fs from 'fs'
import path from 'path'
import { generateTitle } from './utils/title.js'
import { exec } from 'child_process'

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
                console.log(util.inspect(_.pick(res.response, ['status', 'statusText', 'data']), true, null, true))
            } else {
                generateTitle(" Response ")

                // const a = _.get(res, 'config')
                // console.log(Object.keys(a as unknown as object))
                console.log(util.inspect(_.pick(res, ['config.headers', 'config.url', 'config.method', 'status', 'statusText', 'data']), true, null, true))
            }

            const file = path.resolve('./workspace/output.json')
            fs.writeFileSync(file, JSON.stringify(_.pick(res, ['config.headers', 'config.url', 'config.method', 'status', 'statusText', 'data'])), 'utf8')

            exec(`${path.resolve('./node_modules/prettier/bin-prettier.js')} --write ${path.resolve('./workspace/output.json')}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            })
        }
    })

program.parse()



    // const conf = configFile()


