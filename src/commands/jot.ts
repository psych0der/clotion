import {Command, flags} from '@oclif/command'
import {Client} from '@notionhq/client'
import * as path from 'path'
import cli from 'cli-ux'
// eslint-disable-next-line node/no-unsupported-features/node-builtins
import {promises as fs} from 'fs'

export default class Jot extends Command {
  static description = 'Create an entry in database'

  static examples = [
    '$ clotion jot --db <alias> value',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    db: flags.string({char: 'd', description: 'DB alias to record entry to', required: true}),
    priority: flags.integer({char: 'p', description: 'priority of the task'}),
  }

  static args = [
    {name: 'value'},
    {name: 'priority'},
  ]

  async run() {
    const {args, flags} = this.parse(Jot)
    const configFile = await fs.readFile(path.join(this.config.configDir, 'config.json'))
    const userConfig = JSON.parse(String(configFile))
    if (!(flags.db in userConfig.db)) {
      this.error(`Unknown db alias ${flags.db}`)
    }
    const priority = flags.priority || 1
    const notion = new Client({auth: process.env.NOTION_KEY})
    cli.action.start('Saving entry')
    const response = await notion.pages.create({
      parent: {
        database_id: userConfig.db[flags.db],
      },
      properties: {
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {content: args.value},
            },
          ],
        },
        priority: {
          type: 'number',
          number: priority,
        },
      },
    })
    cli.action.stop()
    this.debug(response)
    this.debug(userConfig)
  }
}
