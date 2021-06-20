import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import * as path from 'path'
// eslint-disable-next-line node/no-unsupported-features/node-builtins
import {promises as fs} from 'fs'

export default class Db extends Command {
  static description = 'Manages database alias'

  static flags = {
    help: flags.help({char: 'h'}),
    set: flags.string({char: 'n', description: 'set new alias', exclusive: ['unset']}),
    // flag with no value (-f, --force)
    unset: flags.string({char: 'u', exclusive: ['set']}),
    ...cli.table.flags(),
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Db)
    const configFile = await fs.readFile(path.join(this.config.configDir, 'config.json'))
    const userConfig = JSON.parse(String(configFile))
    // set new alias
    if (flags.set) {
      const pair = flags.set.split(':')
      if (pair.length !== 2) {
        this.error('Invalid format for specifying db alias. Please use the following format --set=alias:db_id')
      }
      userConfig.db[pair[0]] = pair[1]
      // write the file
      await fs.writeFile(path.join(this.config.configDir, 'config.json'), JSON.stringify(userConfig))
    }
    // remove the alias
    if (flags.unset) {
      if (flags.unset in userConfig.db) {
        delete userConfig.db[flags.unset]
        // write the file
        await fs.writeFile(path.join(this.config.configDir, 'config.json'), JSON.stringify(userConfig))
      }
    }

    this.log('Registered aliases:')
    // const {flags} = this.parse(Db)
    for (const property in userConfig.db) {
      if ({}.hasOwnProperty.call(userConfig.db, property)) {
        this.log(`  ${property} => ${userConfig.db[property]}`)
      }
    }
  }
}
