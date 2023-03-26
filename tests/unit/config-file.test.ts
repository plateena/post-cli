import { loadConfigFile } from "../../src/config-file";

describe("Config file exist", () => {

    it("can check file exist", async () => {
        let rs = loadConfigFile('./workspace/default.yaml')
        expect(rs).not.toBe(false)
    })

    it("can check file not exist", async () => {
        let logSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => { })
        let filePath = '.workspace/non-exist-file.yaml'
        let rs = loadConfigFile(filePath)
        expect(rs).toBe(false)
        expect(logSpy).toHaveBeenCalledWith(`File ${filePath} not exist. Please provide a valid file path.`)
    })

})
