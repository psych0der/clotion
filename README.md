clotion
=======

Command line manager for notion

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/clotion.svg)](https://npmjs.org/package/clotion)
[![Downloads/week](https://img.shields.io/npm/dw/clotion.svg)](https://npmjs.org/package/clotion)
[![License](https://img.shields.io/npm/l/clotion.svg)](https://github.com/psych0der/clotion/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g clotion
$ clotion COMMAND
running command...
$ clotion (-v|--version|version)
clotion/0.0.1 darwin-x64 node-v12.20.1
$ clotion --help [COMMAND]
USAGE
  $ clotion COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`clotion db [FILE]`](#clotion-db-file)
* [`clotion help [COMMAND]`](#clotion-help-command)
* [`clotion jot [VALUE] [PRIORITY]`](#clotion-jot-value-priority)

## `clotion db [FILE]`

Manages database alias

```
USAGE
  $ clotion db [FILE]

OPTIONS
  -h, --help              show CLI help
  -n, --set=set           set new alias
  -u, --unset=unset
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/db.ts](https://github.com/psych0der/clotion/blob/v0.0.1/src/commands/db.ts)_

## `clotion help [COMMAND]`

display help for clotion

```
USAGE
  $ clotion help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `clotion jot [VALUE] [PRIORITY]`

Create an entry in database

```
USAGE
  $ clotion jot [VALUE] [PRIORITY]

OPTIONS
  -d, --db=db              (required) DB alias to record entry to
  -h, --help               show CLI help
  -p, --priority=priority  priority of the task

EXAMPLE
  $ clotion jot --db <alias> value
```

_See code: [src/commands/jot.ts](https://github.com/psych0der/clotion/blob/v0.0.1/src/commands/jot.ts)_
<!-- commandsstop -->
