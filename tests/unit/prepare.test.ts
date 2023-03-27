import * as configFn from "../../src/config-file";
import * as prepareFn from "../../src/prepare-make-request";

const validFilePath = "./tests/asset/default.yaml"

describe("Prepare Make Request", () => {
    const request: configRequest | false = configFn.loadConfigFile(validFilePath, 'test1')
    if (!request) {
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
});
