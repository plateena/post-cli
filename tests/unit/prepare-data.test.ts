import * as configFn from "../../src/config-file";
import * as prepareFn from "../../src/prepare-make-request";

const validFilePath = "./tests/asset/default.yaml"

describe("Prepare Data", () => {
    const request: configRequest | false = configFn.loadConfigFile(validFilePath, 'test1')
    if (!request) {
        throw new Error("Load request fail returning false")
    }

    it("can get data", async () => {
        const rs = prepareFn.getData(request)
        expect(rs).toMatchObject({
            name: "Jonh Doe",
            email: "john.doe@mailinator.com",
            password: "secret",
        })
    });
});
