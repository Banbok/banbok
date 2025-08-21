# hog.js

A lightweight, customizable logging library for TypeScript/JavaScript applications with multiple output formats and colored console output.

## Features

- 🎨 **Colored Console Output** - Different colors for each log level
- 📍 **Source Location Tracking** - Automatically captures file and line information
- ⏰ **Timestamp Support** - UTC timestamps with optional display
- 📄 **Multiple Formats** - JSON, TEXT, and SIMPLE output formats
- 🔧 **Configurable Options** - Flexible configuration for different environments
- 🎯 **Four Log Levels** - INFO, ERROR, WARNING, DEBUG

## Installation

```bash
npm install @banbok/log
```

## Quick Start

```typescript
import { Logger } from "@banbok/log";

// Basic usage with default settings
const logger = new Logger();

logger.INFO("Application started");
logger.ERROR("Database connection failed");
logger.WARNING("Deprecated API usage");
logger.DEBUG("Processing user data");
```

## Configuration

### Constructor Options

```typescript
// Using options object
const logger = new Logger({
  timestamp: true, // Show timestamps (default: true)
  color: true, // Show colors (default: true)
  format: LogFormat.TEXT, // Output format (default: TEXT)
});

// Using individual parameters
const logger = new Logger(true, true, LogFormat.JSON);
```

### Log Formats

#### TEXT Format (Default)

```
2024-01-20T10:30:45.123Z INFO [/path/to/file.ts:25:10]: Application started
```

#### JSON Format

```json
{
  "timestamp": "2024-01-20T10:30:45.123Z",
  "level": "INFO",
  "location": "/path/to/file.ts:25:10",
  "message": "Application started"
}
```

#### SIMPLE Format

```
2024-01-20T10:30:45.123Z INFO: Application started
```

### Available Options

```typescript
import { LogFormat } from "@banbok/log";

interface LoggerOptions {
  timestamp?: boolean; // Show/hide timestamps
  color?: boolean; // Enable/disable colors
  format?: LogFormat; // Output format
}

enum LogFormat {
  JSON = "json",
  TEXT = "text",
  SIMPLE = "simple",
}
```

## Log Levels

| Level     | Color     | Description         |
| --------- | --------- | ------------------- |
| `INFO`    | 🟢 Green  | General information |
| `ERROR`   | 🔴 Red    | Error conditions    |
| `WARNING` | 🟡 Yellow | Warning conditions  |
| `DEBUG`   | 🔵 Blue   | Debug information   |

## Examples

### Different Configurations

```typescript
import { Logger, LogFormat } from "@banbok/log";

// Production logger (JSON format, no colors)
const prodLogger = new Logger({
  timestamp: true,
  color: false,
  format: LogFormat.JSON,
});

// Development logger (colored text with timestamps)
const devLogger = new Logger({
  timestamp: true,
  color: true,
  format: LogFormat.TEXT,
});

// Simple console logger
const simpleLogger = new Logger({
  timestamp: false,
  color: true,
  format: LogFormat.SIMPLE,
});
```

### Logging Objects and Arrays

```typescript
const logger = new Logger();

// Log objects
logger.INFO("User data:", { id: 123, name: "John" });

// Log arrays
logger.DEBUG("Processing items:", [1, 2, 3, 4, 5]);

// Multiple arguments
logger.ERROR("Failed to process:", error, "for user:", userId);
```

### Environment-Specific Usage

```typescript
import { Logger, LogFormat } from "@banbok/log";

const logger = new Logger({
  timestamp: true,
  color: process.env.NODE_ENV !== "production",
  format:
    process.env.NODE_ENV === "production" ? LogFormat.JSON : LogFormat.TEXT,
});
```

## TypeScript Support

Fully typed with TypeScript support:

```typescript
import { Logger, LoggerOptions, LogFormat } from "@banbok/log";

const options: LoggerOptions = {
  timestamp: true,
  color: true,
  format: LogFormat.JSON,
};

const logger = new Logger(options);
```

## API Reference

### Logger Class

#### Constructor

```typescript
constructor(options?: LoggerOptions)
constructor(timestamp?: boolean, color?: boolean, format?: LogFormat)
```

#### Methods

- `INFO(...message: unknown[])` - Log info level message
- `ERROR(...message: unknown[])` - Log error level message
- `WARNING(...message: unknown[])` - Log warning level message
- `DEBUG(...message: unknown[])` - Log debug level message

### Types

```typescript
interface LoggerOptions {
  timestamp?: boolean;
  color?: boolean;
  format?: LogFormat;
}

enum LogFormat {
  JSON = "json",
  TEXT = "text",
  SIMPLE = "simple",
}

enum LogLevel {
  INFO = "INFO",
  ERROR = "ERROR",
  WARNING = "WARNING",
  DEBUG = "DEBUG",
}
```

## License

MIT
