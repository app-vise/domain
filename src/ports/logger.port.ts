export abstract class Logger {
  abstract log(message: string, ...meta: unknown[]): void;
  abstract error(message: string, trace?: unknown, ...meta: unknown[]): void;
  abstract warn(message: string, ...meta: unknown[]): void;
  abstract debug(message: string, ...meta: unknown[]): void;
  abstract setContext(context: string): void;
}
