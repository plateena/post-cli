import axios, { AxiosResponse } from 'axios'
import * as prep from './prepare-make-request'

export async function process(request: configRequest): Promise<AxiosResponse> {
    const rs = await axios({
        method: prep.getMethod(request) as unknown as string,
        // url: prep.getUrl(request),
        url: "https://www.google.com",
    })

    return rs
}
