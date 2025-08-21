import * as console from "node:console";
import * as util from "node:util";
import {LogLevel} from "./enums/log-level.enum";
import {LogFormat} from "./enums/log-format.enum";
import {LoggerOptions} from "./interfaces/logger-option.interface";
import {COLORS} from "./constants/color.constant";
import getTimeInUtc from "./util/getTimeInUtc";
import getLineOfCode from "./util/getLineOfCode";

export {LogFormat} from "./enums/log-format.enum";
export {LoggerOptions} from "./interfaces/logger-option.interface";

export class Logger {
    private printTimestamp: boolean;
    private printColour: boolean;
    private logFormat: LogFormat;

    constructor(options?: LoggerOptions);
    constructor(timestamp?: boolean, color?: boolean, format?: LogFormat);
    constructor(
        optionsOrTimestamp?: LoggerOptions | boolean,
        color?: boolean,
        format?: LogFormat
    ) {
        if (typeof optionsOrTimestamp === 'object' && optionsOrTimestamp !== null) {
            const options = optionsOrTimestamp;
            this.printTimestamp = options.timestamp ?? true;
            this.printColour = options.color ?? true;
            this.logFormat = options.format ?? LogFormat.TEXT;
        } else {
            this.printTimestamp = optionsOrTimestamp ?? true;
            this.printColour = color ?? true;
            this.logFormat = format ?? LogFormat.TEXT;
        }
    }

    private printLog = (logLevel: LogLevel, ...message: unknown[]) => {
        const timeInUtc = getTimeInUtc();
        const lineOfLog = getLineOfCode();
        const args = util.format(...message);
        let color = '';
        if (logLevel === LogLevel.ERROR) {
            color = COLORS.RED;
        } else if (logLevel === LogLevel.INFO) {
            color = COLORS.GREEN;
        } else if (logLevel === LogLevel.WARNING) {
            color = COLORS.YELLOW;
        } else if (logLevel === LogLevel.DEBUG) {
            color = COLORS.BLUE;
        }

        const formattedMessage = this.formatLog(color, timeInUtc, logLevel, lineOfLog, args);

        console.log(formattedMessage);
    }

    private formatLog(color: string, timeInUtc: string, logLevel: LogLevel, lineOfLog: string | undefined, args: string) {
        const logData = {
            timestamp: timeInUtc,
            level: logLevel,
            location: lineOfLog,
            message: args
        };

        switch (this.logFormat) {
            case LogFormat.JSON:
                return this.formatAsJson(logData);
            case LogFormat.SIMPLE:
                return this.formatAsSimple(logData, color);
            case LogFormat.TEXT:
            default:
                return this.formatAsText(logData, color);
        }
    }

    private formatAsJson(logData: any): string {
        const filteredData: any = {};

        if (this.printTimestamp) filteredData.timestamp = logData.timestamp;
        filteredData.level = logData.level;
        if (logData.location) filteredData.location = logData.location;
        filteredData.message = logData.message;

        return JSON.stringify(filteredData);
    }

    private formatAsSimple(logData: any, color: string): string {
        let message = '';

        if (this.printColour) message += color;
        if (this.printTimestamp) message += `${logData.timestamp} `;
        message += `${logData.level}: ${logData.message}`;
        if (this.printColour) message += COLORS.RESET;

        return message;
    }

    private formatAsText(logData: any, color: string): string {
        let formattedMessage = '';

        if (this.printColour) {
            formattedMessage += color;
        }

        if (this.printTimestamp) {
            formattedMessage += logData.timestamp;
        }

        formattedMessage += ` ${logData.level} [${logData.location}]: ${logData.message}`;

        if (this.printColour) {
            formattedMessage += COLORS.RESET;
        }

        return formattedMessage;
    }

    INFO = (...message: unknown[]) => {
        this.printLog(LogLevel.INFO, ...message);
    }

    ERROR = (...message: unknown[]) => {
        this.printLog(LogLevel.ERROR, ...message);
    }

    WARNING = (...message: unknown[]) => {
        this.printLog(LogLevel.WARNING, ...message);
    }

    DEBUG = (...message: unknown[])=> {
        this.printLog(LogLevel.DEBUG, ...message);
    }
}