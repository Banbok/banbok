export const QUEUE_NAMES = {
  DAILY_PROBLEM_REMINDER: 'check-problems-at-9am-daily',
};

export const CRON_EXPRESSIONS = {
  EVERYDAY_9AM: '0 0 9 * * *',
  DAILY_9AM_WEEKDAYS: '0 0 9 * * 1-5',
  EVERY_15_SECONDS: '*/15 * * * * *',
  EVERY_MINUTE: '*/1 * * * *',
};

export const REMINDER_INTERVALS = [1, 3, 7, 21];
