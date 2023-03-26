import { loadConfigFile, isValidExtension } from "../../src/config-file";

let validFilePath = "./workspace/default.yaml"
let invalidFilePath = '.workspace/non-exist-file.yaml'

describe("Config file exist", () => {

    it("can check file exist", async () => {
        let rs = loadConfigFile(validFilePath)
        expect(rs).not.toBe(false)
    })

    it("can check file not exist", async () => {
        let logSpy = jest.spyOn(console, 'error')
            // .mockImplementation(() => { })
        let rs = loadConfigFile(invalidFilePath)
        expect(rs).toBe(false)
        expect(logSpy).toHaveBeenCalledWith(`File ${invalidFilePath} not exist. Please provide a valid file path.`)
    })

})

describe("Config file ext", () => {
    it("can check ext is valid", async () => {
        let rs = isValidExtension(validFilePath)
        expect(rs).toBe(true)
    });

    it("can check ext is in-valid", async () => {
        let rs = isValidExtension(validFilePath + ".png")
        let logSpy = jest.spyOn(console, 'error')
            // .mockImplementation(() => { })
        expect(rs).toBe(false)
        expect(logSpy).toHaveBeenCalledWith(`${validFilePath}.png is invalid. Please provide yaml or yml file extension.`)
    });
})
