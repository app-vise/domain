import { PageInfo } from './page-info';
import { SearchResult } from './search-result';

export type SearchResponse<T> = {
  results: SearchResult<T>[];
  pageInfo: PageInfo;
  totalCount?: number;
};
