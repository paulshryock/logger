# @paulshryock/logger

| :warning: This project is in early development and not for production use. |
| :------------------------------------------------------------------------- |

[PSR-3](https://www.php-fig.org/psr/psr-3/)-compliant logger for Node.js.

Total size is less than 9 KiB.

![Latest version badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fpaulshryock%2Flogger%2Fraw%2Fmain%2Fpackage.json&query=%24.version&prefix=v&label=latest%20version) ![npm bundle size](https://img.shields.io/bundlephobia/min/%40paulshryock%2Flogger) ![npm downloads badge](https://img.shields.io/npm/dt/%40paulshryock/logger) [![Socket badge](https://socket.dev/api/badge/npm/package/@paulshryock/logger)](https://socket.dev/npm/package/@paulshryock/logger) ![GitHub License](https://img.shields.io/github/license/paulshryock/logger)

## Requirements

| Software | Minimum Version |
| :------- | :-------------- |
| Node     | 18.x            |

## Installation

```bash
npm install @paulshryock/logger
```

## API

### Usage examples

```typescript
import { CommandLineLogger, Logger } from '@paulshryock/logger'

class MyClass {
    #logger: Logger

    public constructor(logger: Logger) {
        this.#logger = logger
    }

    public logMessages(): void {
        this.#logger.emergency('System is unusable.')
        this.#logger.alert('Action must be taken immediately.')
        this.#logger.critical('Critical conditions.')
        this.#logger.error('Runtime error.')
        this.#logger.warn('Exceptional occurrence that is not an error.')
        this.#logger.notice('Normal but significant event.')
        this.#logger.info('Interesting event.')
        this.#logger.debug('Detailed debug information.')
    }
}

new MyClass(new CommandLineLogger())
```

## Support

- [Ask a question](https://github.com/paulshryock/logger/issues/new?assignees=&labels=question&projects=&template=1_ask_a_question.md&title=)
- [Request a feature](https://github.com/paulshryock/logger/issues/new?assignees=&labels=enhancement&projects=&template=2_request_a_feature.md&title=)
- [Document a user story](https://github.com/paulshryock/logger/issues/new?assignees=&labels=enhancement&projects=&template=3_document_a_user_story.md&title=)
- [Report a bug](https://github.com/paulshryock/logger/issues/new?assignees=&labels=bug&projects=&template=4_report_a_bug.md&title=)

## Contributing

Contributions are welcome! **Read the [contribution guidelines](https://github.com/paulshryock/logger/blob/main/CONTRIBUTING.md)**, and then submit a pull request.

## Maintainers

- [Paul Shryock](https://github.com/paulshryock)

## License

[MIT License](https://github.com/paulshryock/logger/blob/main/LICENSE)
