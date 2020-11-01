export interface IPostData {
  version: string;
  host: string;
  short_message: string;
  full_message: string | null;
  timestamp: number;
  level: number;
  [index: string]: any;
}
