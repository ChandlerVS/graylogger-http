# graylogger-http
A simple library for sending logs to a Graylog server via HTTP
## Basic Usage
Currently, the class takes 2 options. The URL of the graylog endpoint and the hostname of your software.

Additional info can be passed with a third parameter that contains keys that are prefixed with a "_".

```typescript
import {GrayLogger} from "graylogger-http";

const grayLogger = new GrayLogger({
  "url": "http://localhost:12201",
  "host": "localhost"
});

grayLogger.info("This is a test", "This is the more detailed string");

grayLogger.error("Failed customer creation.", "Couldn't connect to database", {
  _first_name: "John",
  _last_name: "Doe"
});
```
