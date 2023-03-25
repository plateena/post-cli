import { cli } from './utils/cli'

describe('test', () => {
    it('can show app error', async () => {
        let rs: any = await cli(`node ./build/index.js`)
        console.log(rs);
        
    })

    it('can show app version', async () => {
        let rs: any = await cli(`node ./build/index.js -v`)
        expect(rs).toMatch(/v1.0/)
    })

    it('can show app --help', async () => {
        let rs: any = await cli(`node ./build/index.js -h`)
        expect(rs).toMatch(/-h, --help +display help for command/)
    })
})
