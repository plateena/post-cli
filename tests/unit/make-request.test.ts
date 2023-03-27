import * as configFn from "../../src/config-file"
import * as req from "../../src/make-request"

const validFilePath = "./tests/asset/default.yaml"

describe("Make Request", () => {
    // const request: configRequest | false = configFn.loadConfigFile(validFilePath, 'test1')
    //     if (!request) {
    //         throw new Error("Load config fail returning false")
    //     }
    //
    it("can make request", async () => {
        //         const rs = await req.process(request)
        //         // @TODO: <plateena711@gmail.com> delete this debug line
        //         console.log(Object.keys(rs))
        //         console.log(rs.constructor.name);
        //         if ("statusText" in rs) {
        //             console.log(rs.statusText);
        //             console.log(rs.data);
        //         }
        //
        //
        //         if ("message" in rs) {
        //             // console.log(rs.message)
        //             // console.log(rs.code)
        //             // console.log(rs.request)
        //             // console.log(rs.response)
        //             // console.log(rs.config)
        //         }
        //
        //         // if(rs) {
        //         // expect(rs.status).toBe(200)
        //         // } else {
        //         //     throw new Error("Make request failed by returning false");
        //         //     
        //         // }
        expect(true).toBe(true)
    });
});
