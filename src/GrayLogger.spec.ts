import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { GrayLogger } from "./GrayLogger";

chai.should();
chai.use(chaiAsPromised);

let grayLogger = new GrayLogger({
  host: "localhost",
  url: "http://localhost:12201",
});

describe("Log Levels", () => {
  it("should return true if you log a message with a full message", async function () {
    let result = await grayLogger.log(
      "This should be a successful log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a debug message", async function () {
    let result = await grayLogger.debug(
      "This should be a successful debug log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a info message", async function () {
    let result = await grayLogger.info(
      "This should be a successful info log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a notice message", async function () {
    let result = await grayLogger.notice(
      "This should be a successful notice log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a warning message", async function () {
    let result = await grayLogger.warning(
      "This should be a successful warning log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a error message", async function () {
    let result = await grayLogger.error(
      "This should be a successful error log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a critical message", async function () {
    let result = await grayLogger.critical(
      "This should be a successful critical log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a alert message", async function () {
    let result = await grayLogger.alert(
      "This should be a successful alert log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });

  it("should return true when you log a emergency message", async function () {
    let result = await grayLogger.emergency(
      "This should be a successful emergency log",
      "This is the remainder of the log messages"
    );

    expect(result).to.be.true;
  });
});

describe("Additional Info Logs", () => {
  it("should return true when you log a message with additional info formatted correctly", async function () {
    let result = await grayLogger.info(
      "This should be a successful log with customer information",
      "This is the remainder of the log messages",
      {
        _customer_type: "Standard",
        _customer_id: "123456",
      }
    );

    expect(result).to.be.true;
  });

  it("should fail when you try to send a log message with improperly formatted additional info", function () {
    grayLogger.info(
      "This should be a successful log with customer information",
      "This is the remainder of the log messages",
      {
        customer_type: "Standard",
        customer_id: "123456",
      }
    ).should.be.rejected;
  });
});
