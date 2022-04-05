import { SelectionSet } from './selection-set';

export abstract class WriteRepository<TEntity> {
  abstract existsById(id: string): Promise<boolean>;
  abstract findOneById(
    id: string,
    selectionSet?: SelectionSet
  ): Promise<TEntity | undefined>;
  abstract findOneByIdOrThrow(
    id: string,
    selectionSet?: SelectionSet
  ): Promise<TEntity>;
  abstract save(entity: TEntity): Promise<TEntity>;
  abstract delete(entity: TEntity): Promise<void>;
}
