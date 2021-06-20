import {Hook} from '@oclif/config'
import * as path from 'path'
// eslint-disable-next-line node/no-unsupported-features/node-builtins
import {promises as fs} from 'fs'

const hook: Hook<'init'> = async function () {
  try {
    await fs.mkdir(this.config.configDir, {recursive: true})
    await fs.access(path.join(this.config.configDir, 'config.json'))
    return true
  } catch {
    await fs.writeFile(path.join(this.config.configDir, 'config.json'), JSON.stringify({db: {}}))
  }
}

export default hook
