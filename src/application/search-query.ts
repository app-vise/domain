import { SelectionSet } from '../repository';
import { SearchRequest } from '../search';

export class SearchQuery {
  constructor(
    public readonly request: SearchRequest,
    public readonly selectionSet?: SelectionSet
  ) {}
}
