import axios, { AxiosInstance } from "axios";
import { IGraylogConfiguration } from "./Interfaces/IGraylogConfiguration";
import { IPostData } from "./Interfaces/IPostData";

export class GrayLogger {
  baseUrl: string;
  host: string;
  axios: AxiosInstance;

  constructor(config: IGraylogConfiguration) {
    this.baseUrl = config.url;
    this.host = config.host;

    this.axios = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public debug(message: string, fullMessage: string, optionalFields: any = {}) {
    return this.log(message, fullMessage, optionalFields, 7);
  }

  public info(message: string, fullMessage: string, optionalFields: any = {}) {
    return this.log(message, fullMessage, optionalFields, 6);
  }

  public notice(
    message: string,
    fullMessage: string,
    optionalFields: any = {}
  ) {
    return this.log(message, fullMessage, optionalFields, 5);
  }

  public warning(
    message: string,
    fullMessage: string,
    optionalFields: any = {}
  ) {
    return this.log(message, fullMessage, optionalFields, 4);
  }

  public error(message: string, fullMessage: string, optionalFields: any = {}) {
    return this.log(message, fullMessage, optionalFields, 3);
  }

  public critical(
    message: string,
    fullMessage: string,
    optionalFields: any = {}
  ) {
    return this.log(message, fullMessage, optionalFields, 2);
  }

  public alert(message: string, fullMessage: string, optionalFields: any = {}) {
    return this.log(message, fullMessage, optionalFields, 1);
  }

  public emergency(
    message: string,
    fullMessage: string,
    optionalFields: any = {}
  ) {
    return this.log(message, fullMessage, optionalFields, 0);
  }

  public log = (
    message: string,
    fullMessage: string,
    optionalFields: any = {},
    level: number = 6
  ) => {
    return new Promise((resolve, reject) => {
      for (let field in optionalFields) {
        // noinspection JSUnfilteredForInLoop
        if (!field.match(/^_/g)) {
          reject(
            new Error("Additional field must be prefixed with an underscore.")
          );
        }
      }

      let postData: IPostData = {
        version: "1.1",
        host: this.host,
        level: level,
        short_message: message,
        full_message: fullMessage,
        timestamp: Math.floor(new Date().getTime() / 1000),
        ...optionalFields,
      };

      this.axios
        .post("/gelf", postData)
        .then((result) => {
          if (result.status == 202) resolve(true);
          else
            reject(
              new Error("Bad status code from Graylog server: " + result.status)
            );
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
}
