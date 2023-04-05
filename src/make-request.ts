import axios, { AxiosResponse, AxiosHeaders } from 'axios'
import FormData from 'form-data'
import * as prep from './prepare-make-request.js'
import _ from 'lodash'

export async function process(request: configRequest, opt?: { data: Array<string> }): Promise<AxiosResponse> {
    try {
        let data: FormData
        if (opt && 'data' in opt) {
            data = prep.getData(request, opt.data)
        } else {
            data = prep.getData(request)
        }

        for (const pair of data.entries()) {
            // @TODO: <plateena711@gmail.com> delete this debug line
            console.log(pair[0], '------------ ', pair[1])
        }
        const rs = await axios({
            headers: prep.getHeader(request) as unknown as AxiosHeaders,
            method: prep.getMethod(request) as unknown as string,
            url: prep.getUrl(request),
            // url: "https://www.google.com",
            data: data
        })

        return rs
    } catch (error) {
        throw new Error(_.get(error, 'message'))
    }
}
