export enum LogLevel {
  INFO = "INFO",
  ERROR = "ERROR",
  WARNING = "WARNING",
  DEBUG = "DEBUG",
}

export const LogLevelDescription = {
  [LogLevel.INFO]: "INFO",
  [LogLevel.ERROR]: "ERROR",
  [LogLevel.WARNING]: "WARNING",
  [LogLevel.DEBUG]: "DEBUG",
} as const;
