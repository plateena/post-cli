#!/usr/bin/env node
import greetings from './greetings.js'
import * as config from './config-file.js'
import { Command } from 'commander'
import * as req from './make-request.js'
// import boxen from "boxen"
import chalk from 'chalk'
import _ from 'lodash'
import util from 'util'
import fs from 'fs'
import path from 'path'
import { generateTitle } from './utils/title.js'
import { exec } from 'child_process'
import { listRequest } from './list-request.js'

const program = new Command()

greetings()

program
    .name('post-cli')
    .description('cli version of postman')
    .argument('[testName]', 'the test name under request')
    .argument('[fileName]', 'name of the config file without yaml extension')
    .option('-l, --list', 'list all available request')
    .version('v1.0', '-v, --version', 'output the current verions')
    .action(async (testName, fileName, opt) => {
        let file = './workspace/default.yaml'
        if (fileName) {
            file = fileName
        }

        // listing the request with description in file
        if (opt.list) {
            listRequest(file)
            return
        }

        if (testName) {
            // load the config
            const rs = config.loadConfigFile(file, testName)

            if (typeof rs == 'object') {

                try {
                    const res = await req.process(rs)
                    generateTitle(" Request ")
                    console.log(rs)

                    if ('response' in res) {
                        generateTitle(" Response ")
                        // const a = _.get(res, 'config')
                        // console.log(Object.keys(a as unknown as object))
                        console.log(util.inspect(_.pick(res.response, ['config.headers', 'config.url', 'config.method', 'status', 'statusText', 'data']), true, null, true))
                    } else {
                        generateTitle(" Response ")

                        // const a = _.get(res, 'config')
                        // console.log(Object.keys(a as unknown as object))
                        console.log(util.inspect(_.pick(res, ['config.headers', 'config.url', 'config.method', 'status', 'statusText', 'data', 'message']), true, null, true))
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
                } catch (error) {
                    console.error(chalk.red.bold(_.get(error, 'message')))
                }

            }
        }
    })

program.parse()

if (process.argv.length === 2) program.help()



    // const conf = configFile()


