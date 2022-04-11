import { ArgumentNotProvidedException } from '../exceptions';
import { Guard } from '../utils';

export type CommandProps<T> = Omit<T, 'correlationId' | 'commandId'> &
  Partial<Command>;

export class Command {
  constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Command props should not be empty'
      );
    }
  }
}
