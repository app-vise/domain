import { ArgumentNotProvidedException, Guard } from '../index';

export type MessageProps<T> = Partial<Message>;

export class Message {
  constructor(props: MessageProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Message props should not be empty'
      );
    }
  }

  public getEventName(): string {
    return 'unknown';
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
