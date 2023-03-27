import { cli } from './utils/cli'

describe('test', () => {
    it('can show app error', async () => {
        const rs: any = await cli(`node ./build/index.js`)
        
    })

    it('can show app version', async () => {
        const rs: any = await cli(`node ./build/index.js -v`)
        expect(rs).toMatch(/v1.0/)
    })

    it('can show app --help', async () => {
        const rs: any = await cli(`node ./build/index.js -h`)
        expect(rs).toMatch(/-h, --help +display help for command/)
    })
})
