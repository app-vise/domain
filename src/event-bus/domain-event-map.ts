import { DomainEventClass } from '../domain-events';
import { Message } from './message';

export interface DomainEventMap {
  events: {
    event: DomainEventClass;
    message: typeof Message;
  }[];
}
