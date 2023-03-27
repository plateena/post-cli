import * as configFn from "../../src/config-file";
import * as prepareFn from "../../src/prepare-make-request";

const validFilePath = "./tests/asset/default.yaml"

describe("Prepare Make Request", () => {
    const request: configRequest | false = configFn.loadConfigFile(validFilePath, 'test1')
    if (!request) {
        throw new Error("Load request fail returning false")
    }
    const requestParam: configRequest | false = configFn.loadConfigFile(validFilePath, 'test2')
    if (!requestParam) {
        throw new Error("Load request fail returning false")
    }

    it("can get method", async () => {
        const rs = prepareFn.getMethod(request)
        expect(rs).toBe("GET")
    });

    it("can get url", async () => {
        const rs = prepareFn.getUrl(request)
        expect(rs).toBe("https://local.hws-console.test.com/demo")
    });

    it("can get url with params", async () => {
        const rs = prepareFn.getUrl(requestParam)
        expect(rs).toBe("https://local.hws-console.com/ai/im/v2")
    });

    it("can get url with params with query", async () => {
        requestParam.url = "https://local.hws-console.com/ai/:service/:version?page=12"
        const rs = prepareFn.getUrl(requestParam)
        expect(rs).toBe("https://local.hws-console.com/ai/im/v2?page=12")
    });

    it("can get url with params with prefix same", async () => {
        requestParam.url = "https://local.hws-console.com/ai/:service/:version/:serviceVersion?page=12"
        const rs = prepareFn.getUrl(requestParam)
        expect(rs).toBe("https://local.hws-console.com/ai/im/v2/:serviceVersion?page=12")
    });

    it("can get url with params with prefix same end", async () => {
        requestParam.url = "https://local.hws-console.com/ai/:serviceVersion/:version/:service?page=12"
        const rs = prepareFn.getUrl(requestParam)
        expect(rs).toBe("https://local.hws-console.com/ai/:serviceVersion/v2/im?page=12")
    });
});
