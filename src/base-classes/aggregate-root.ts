import { Entity } from './entity.base';
import { DomainEvent, DomainEvents } from '../domain-events';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.prepareForPublish(this);
  }

  public markEventAsSent(eventName: string): void {
    const index = this._domainEvents.findIndex(
      (event) => event.constructor.name === eventName
    );
    this._domainEvents[index].sent = true;
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
