import { Entity } from './entity.base';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  // TODO: implement custom DomainEventBus so we can decouple Entity from Nest AggregateRoot
}
