import {
  DomainEvent,
  DomainEventHandler,
  DomainEvents,
} from '../domain-events';
import { EventBus } from './event-bus';
import { DomainEventMap } from './domain-event-map';

export class DomainEventEmitter extends DomainEventHandler {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventMap: DomainEventMap
  ) {
    // We will override the listen method
    // So, just provide the first event to make the parent class happy
    super(eventMap.events[0].event);
  }

  async handle(event: DomainEvent): Promise<void> {
    const mappedEvent = this.eventMap.events.find(
      (_event) => event instanceof _event.event
    );

    if (!mappedEvent) {
      throw Error('Message to emit for DomainEvent not found');
    }

    const message = new mappedEvent.message(JSON.parse(JSON.stringify(event)));

    await this.eventBus.emit(message.getEventName(), message.toString());
  }

  public override listen(): void {
    for (let i = 0; i < this.eventMap.events.length; i++) {
      DomainEvents.subscribe(this.eventMap.events[i].event, this);
    }
  }
}
