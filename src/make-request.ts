import axios, { AxiosError, AxiosResponse, AxiosHeaders } from 'axios'
import * as prep from './prepare-make-request.js'

export async function process(request: configRequest): Promise<AxiosResponse | AxiosError> {
    try {
        const rs = await axios({
            headers: prep.getHeader(request) as unknown as AxiosHeaders, 
            method: prep.getMethod(request) as unknown as string,
            url: prep.getUrl(request),
            // url: "https://www.google.com",
            data: prep.getData(request)
        })

        return rs
    } catch (error) {
        return error as AxiosError
    }
}
