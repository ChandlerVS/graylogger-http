import { GrayLogger } from "./src/GrayLogger";

let grayLogger = new GrayLogger({
  host: "localhost",
  url: "http://localhost:12201",
});

grayLogger.info(
  "This should be a successful log with customer information",
  "This is the remainder of the log messages",
  {
    customer_type: "Standard",
    customer_id: "123456",
  }
);
