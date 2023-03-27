import * as configFn  from "../../src/config-file";

const validFilePath = "./tests/asset/default.yaml"

describe("Make Request", () => {
    const config = configFn.loadConfigFile(validFilePath, 'test1')
    if (!config) {
        throw new Error("Load config fail returning false")
    }

    it("can make request", async () => {
        expect(config.url).toBe("https://local.hws-console.test.com/demo")
    });
});
