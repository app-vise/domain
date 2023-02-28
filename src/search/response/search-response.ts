import { PageInfo } from './page-info';
import { SearchResult } from './search-result';

export interface SearchResponse<
  T,
  S extends SearchResult<T> = SearchResult<T>
> {
  results: S[];
  pageInfo: PageInfo;
  totalCount?: number;
}
