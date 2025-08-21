export enum LogFormat {
  JSON = "json",
  TEXT = "text",
  SIMPLE = "simple",
}

export const LogFormatDescription = {
  [LogFormat.JSON]: "JSON",
  [LogFormat.TEXT]: "TEXT",
  [LogFormat.SIMPLE]: "SIMPLE",
} as const;
