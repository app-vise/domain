export abstract class EventBus {
  abstract emit<TInput = any>(pattern: any, data: TInput): Promise<void>;
}
