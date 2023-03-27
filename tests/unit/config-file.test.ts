import {
    loadConfigFile,
    isValidExtension,
    loadConfigFromYaml,
    populateConfig,
    getConfigVariable,
    getConfigRequest
} from "../../src/config-file";

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
    const content = loadConfigFromYaml(validFilePath)
    if (!content) {
        throw new Error("Load config fail returning false")
    }

    it("can check config file content base on variable base url", async () => {
        expect(content.variables.base_url).toBe("https://local.hws-console.test.com")
        expect(content.request.test1.url).toBe("{{base_url}}/demo")
        expect(content.request.test1.method).toBe("GET")
    });

    it("can get config variable data", async () => {
        const variables = getConfigVariable(content)
        expect(variables.base_url).toBe('https://local.hws-console.test.com')
    });

    it("can get request with given name", async () => {
        const request = getConfigRequest(content, 'test1')
        if (request != false) {
            expect(request.method).toBe('GET')
            expect(request.url).toBe('{{base_url}}/demo')
        } else {
            throw new Error("The request return false, mean that there are no request by the name")
        }
    });

    it("can populate config data", async () => {
        const rs = populateConfig(getConfigRequest(content, 'test1'), getConfigVariable(content))
        if (rs) {
            expect(rs.url).toBe("https://local.hws-console.test.com/demo")
        } else {
            throw new Error("Request are not return, false received")
        }
    });

    it("can pass error when user pass wrong request name", async () => {
        const rs = populateConfig(getConfigRequest(content, 'no-test1'), getConfigVariable(content))
        expect(rs).toBe(false)
    });
});
