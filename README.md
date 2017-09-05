# winston-azure-functions

```typescript
import { AzureFunctions } from 'winston-azure-functions'
import winston = require('winston')
module.exports = (context) => {
  winston.configure({
    transports: [
      new AzureFunctions({ context })
    ]
  })
  winston.info('Initializing function')
}
```

## Supported log levels

| Log level   | Description                                |
| ----------- | ------------------------------------------ |
| **error**   | Writes to error level logging, or lower.   |
| **warn**    | Writes to warning level logging, or lower. |
| **info**    | Writes to info level logging, or lower.    |
| **verbose** | Writes to verbose level logging.           |