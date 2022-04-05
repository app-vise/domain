import { SelectionSet } from './selection-set';
import { SearchRequest, SearchResponse } from '../search';

/**
 * Read + Write repository combined.
 * Extend this class if you don't intend to split the repositories.
 */
export abstract class Repository<TEntity> {
  // Read repository
  abstract find(
    request: SearchRequest,
    selectionSet?: SelectionSet
  ): Promise<SearchResponse<TEntity>>;

  // Read + write repository
  abstract findOneById(
    id: string,
    selectionSet?: SelectionSet
  ): Promise<TEntity | undefined>;
  abstract findOneByIdOrThrow(
    id: string,
    selectionSet?: SelectionSet
  ): Promise<TEntity>;

  // Write repository
  abstract save(entity: TEntity): Promise<TEntity>;
  abstract delete(entity: TEntity): Promise<void>;
}
