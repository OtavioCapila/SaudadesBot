const getTimestamp = () => `[${new Date().toISOString()}]`;

const logger = {
  log: (...args: any[]): void => console.log(getTimestamp(), ...args),
  warn: (...args: any[]): void => console.warn(getTimestamp(), ...args),
  error: (...args: any[]): void => console.error(getTimestamp(), ...args),
};

export default logger;
