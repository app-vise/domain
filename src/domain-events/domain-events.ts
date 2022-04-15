import { AggregateRoot } from '../base-classes/aggregate-root';
import { Logger } from '../ports';
import { ID } from '../value-objects/id.value-object';
import { DomainEvent, DomainEventHandler } from '.';

type EventName = string;

export type DomainEventClass = new (...args: never[]) => DomainEvent;

export class DomainEvents {
  private static subscribers: Map<EventName, DomainEventHandler[]> = new Map();

  private static aggregates: AggregateRoot<unknown>[] = [];

  public static subscribe<T extends DomainEventHandler>(
    event: DomainEventClass,
    eventHandler: T
  ): void {
    const eventName: EventName = event.name;
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }
    this.subscribers.get(eventName)?.push(eventHandler);
  }

  public static prepareForPublish(aggregate: AggregateRoot<unknown>): void {
    const aggregateType = aggregate.constructor.name;
    const aggregateFound = !!this.findAggregateByID(
      aggregate.id,
      aggregateType
    );
    if (!aggregateFound) {
      this.aggregates.push(aggregate);
    }
  }

  public static async publishEvents(
    id: ID,
    aggregateType: string,
    logger: Logger,
    correlationId?: string,
    async = true
  ): Promise<void> {
    const aggregate = this.findAggregateByID(id, aggregateType);

    if (aggregate) {
      logger.debug(
        `[${aggregate.domainEvents.map(
          (event) => event.constructor.name
        )}] publish ${aggregate.id.value}`
      );

      if (async) {
        await Promise.all(
          aggregate.domainEvents.map((event: DomainEvent) => {
            if (correlationId && !event.correlationId) {
              event.correlationId = correlationId;
            }
            return this.publish(id, aggregateType, event, logger);
          })
        );
      } else {
        for (let i = 0; i < aggregate.domainEvents.length; i++) {
          const event = aggregate.domainEvents[i];

          if (correlationId && !event.correlationId) {
            event.correlationId = correlationId;
          }

          await this.publish(id, aggregateType, event, logger);
        }
      }

      aggregate.clearEvents();

      this.removeAggregateFromPublishList(aggregate);
    }
  }

  private static findAggregateByID(
    id: ID,
    aggregateType: string
  ): AggregateRoot<unknown> | undefined {
    for (const aggregate of this.aggregates) {
      if (
        aggregate.id.equals(id) &&
        aggregate.constructor.name === aggregateType
      ) {
        return aggregate;
      }
    }
  }

  private static removeAggregateFromPublishList(
    aggregate: AggregateRoot<unknown>
  ): void {
    const aggregateType = aggregate.constructor.name;
    const index = this.aggregates.findIndex(
      (a) => a.equals(aggregate) && a.constructor.name === aggregateType
    );
    this.aggregates.splice(index, 1);
  }

  private static async publish(
    id: ID,
    aggregateType: string,
    event: DomainEvent,
    logger: Logger
  ): Promise<void> {
    const eventName: string = event.constructor.name;

    if (!event.sent && this.subscribers.has(eventName)) {
      const handlers: DomainEventHandler[] =
        this.subscribers.get(eventName) || [];

      await Promise.all(
        handlers.map((handler) => {
          logger.debug(
            `[${handler.constructor.name}] handling ${event.constructor.name} ${event.aggregateId}`
          );

          // Prevents infinite loop when updating after a save on same aggregate
          this.findAggregateByID(id, aggregateType)?.markEventAsSent(eventName);

          return handler.handle(event);
        })
      );
    }
  }
}
