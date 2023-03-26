import { loadConfigFile, isValidExtension, loadConfigFromYaml } from "../../src/config-file";

const validFilePath = "./tests/asset/default.yaml"
const invalidFilePath = '.workspace/non-exist-file.yaml'

describe("Config file exist", () => {

    it("can check file exist", async () => {
        const rs = loadConfigFile(validFilePath)
        expect(rs).not.toBe(false)
    })

    it("can check file not exist", async () => {
        const logSpy = jest.spyOn(console, 'error')
        // .mockImplementation(() => { })
        const rs = loadConfigFile(invalidFilePath)
        expect(rs).toBe(false)
        expect(logSpy).toHaveBeenCalledWith(`File ${invalidFilePath} not exist. Please provide a valid file path.`)
    })

})

describe("Config file ext", () => {
    it("can check ext is valid", async () => {
        const rs = isValidExtension(validFilePath)
        expect(rs).toBe(true)
    });

    it("can check ext is in-valid", async () => {
        const rs = isValidExtension(validFilePath + ".png")
        const logSpy = jest.spyOn(console, 'error')
        // .mockImplementation(() => { })
        expect(rs).toBe(false)
        expect(logSpy).toHaveBeenCalledWith(`${validFilePath}.png is invalid. Please provide yaml or yml file extension.`)
    });
})

describe("Config file content", () => {
    it("can check config file content base on variable base url", async () => {
        const content = loadConfigFromYaml(validFilePath)
        console.log(content);
        
        if (typeof content != 'boolean') {
            expect(content.variable.base_url).toBe("https://local.hws-console.test.com")
            expect(content.request.test1.url).toBe("{{base_url}}/demo")
            expect(content.request.test1.method).toBe("GET")
        }

    });
});
