import * as configFn from "../../src/config-file"
import * as req from "../../src/make-request"

const validFilePath = "./tests/asset/default.yaml"

describe("Make Request", () => {
    const request: configRequest | false = configFn.loadConfigFile(validFilePath, 'test1')
    if (!request) {
        throw new Error("Load config fail returning false")
    }

    it("can make request", async () => {
        const rs = await req.process(request)
        expect(rs.status).toBe(200)
    });
});
