#!/usr/bin/env node
import greetings from './greetings.js'
import * as config from './config-file.js'
import { Command } from 'commander'
import * as req from './make-request.js'
// import boxen from "boxen"
import chalk from 'chalk'
import _ from 'lodash'
import util from 'util'
import { generateTitle } from './utils/title.js'
import { listRequest } from './list-request.js'
import { writeResult } from './write-result.js'
import { AxiosResponse } from 'axios'

const program = new Command()

greetings()

program
    .name('post-cli')
    .description('cli version of postman')
    .argument('[testName]', 'the test name under request')
    .argument('[fileName]', 'name of the config file without yaml extension')
    .option('-l, --list', 'list all available request')
    .option('-o, --output <value>', 'write output to file')
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
                    const res: AxiosResponse = await req.process(rs)
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

                    if (opt.output) {
                        writeResult(opt.output, res)
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(chalk.red.bold(error.message))
                    } else {
                        console.error('Unexpected error', error)
                    }
                }

            }
        }
    })

program.parse()

if (process.argv.length === 2) program.help()



    // const conf = configFile()


