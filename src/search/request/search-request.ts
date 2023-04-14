import { FilterType } from './filter';
import { SortField } from './sort-field';

export interface SearchRequest {
  first: number;
  before?: string;
  after?: string;
  filter?: FilterType;
  sort?: SortField[];
}

export interface CountRequest {
  filter?: FilterType;
}
