import * as configFn from "../../src/config-file";
import * as prepareFn from "../../src/prepare-make-request";

const validFilePath = "./tests/asset/default.yaml"

describe("Prepare url basic", () => {
    // prepare the request
    const request: configRequest | false = configFn.loadConfigFile(validFilePath, 'test1')
    if (!request) {
        throw new Error("Load request fail returning false")
    }

    // start doing the test
    it("can get method", async () => {
        const rs = prepareFn.getMethod(request)
        expect(rs).toBe("GET")
    });

    it("can get url", async () => {
        const rs = prepareFn.getUrl(request)
        expect(rs).toBe("http://local.hws-console.com/demo")
    });
})

describe("Prepare url param", () => {
    const requestWithParam: configRequest | false = configFn.loadConfigFile(validFilePath, 'test2')
    if (!requestWithParam) {
        throw new Error("Load request fail returning false")
    }

    it("can get url with params", async () => {
        const rs = prepareFn.getUrl(requestWithParam)
        expect(rs).toBe("http://local.hws-console.com/ai/im/v2")
    });

    it("can get url with params with query", async () => {
        requestWithParam.url = "http://local.hws-console.com/ai/:service/:version?page=12"
        const rs = prepareFn.getUrl(requestWithParam)
        expect(rs).toBe("http://local.hws-console.com/ai/im/v2?page=12")
    });

    it("can get url with params with prefix same", async () => {
        requestWithParam.url = "http://local.hws-console.com/ai/:service/:version/:serviceVersion?page=12"
        const rs = prepareFn.getUrl(requestWithParam)
        expect(rs).toBe("http://local.hws-console.com/ai/im/v2/:serviceVersion?page=12")
    });

    it("can get url with params with prefix same end", async () => {
        requestWithParam.url = "http://local.hws-console.com/ai/:serviceVersion/:version/:service?page=12"
        const rs = prepareFn.getUrl(requestWithParam)
        expect(rs).toBe("http://local.hws-console.com/ai/:serviceVersion/v2/im?page=12")
    });


})

describe("Prepare url queries", () => {
    const requestWithQueries: configRequest | false = configFn.loadConfigFile(validFilePath, 'test3')
    if (!requestWithQueries) {
        throw new Error("Load request fail returning false")
    }

    it("can populate the queries", async () => {
        const rs = prepareFn.getUrl(requestWithQueries)
        expect(rs).toBe("http://local.hws-console.com/ai/im/v2?page=10&perPage=15")
    });
});
