import { SearchRequest, SearchResponse } from '../search';
import { SelectionSet } from './selection-set';

export abstract class ReadRepository<TEntity> {
  abstract find(
    request: SearchRequest,
    selectionSet?: SelectionSet
  ): Promise<SearchResponse<TEntity>>;
  abstract findOneById(
    id: string,
    selectionSet?: SelectionSet
  ): Promise<TEntity | undefined>;
  abstract findOneByIdOrThrow(
    id: string,
    selectionSet?: SelectionSet
  ): Promise<TEntity>;
}
