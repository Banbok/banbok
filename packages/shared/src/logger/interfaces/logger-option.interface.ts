import {LogFormat} from "../enums/log-format.enum";

export interface LoggerOptions {
    timestamp?: boolean;
    color?: boolean;
    format?: LogFormat;
}
