import { SelectionSet } from '../repository';
import { SearchRequest } from '../search';

export class SearchQuery {
  constructor(
    public readonly request: SearchRequest,
    public readonly selectionSet?: SelectionSet,
    public readonly currentIdentity?: string,
    searchFieldNames?: string[]
  ) {
    // Only auto map search fields when field names are provided
    if (searchFieldNames && request.filter && request.filter.search) {
      const searchFilter = request.filter.search;

      // Delete original search filter because it's not a field
      delete request.filter.search;

      // Push OR filter inside AND filter to prevent overwriting a possible OR filter
      if (!request.filter.AND) {
        request.filter.AND = [];
      }

      // Add all possible fields
      request.filter.AND.push({
        OR: searchFieldNames.map((fieldName) => {
          return { [fieldName]: searchFilter };
        }),
      });
    }

    this.request = request;
  }
}
