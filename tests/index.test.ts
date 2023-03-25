import cli from "../src/index"
import exec from 'child_process'

describe('test', () => {
    it('can be true', async () => {
        expect(true).toBe(true)
    })

    it('can show help', async () => {
        let rs = await exec(cli, () => {
        })

        console.log(rs)
    })
})

