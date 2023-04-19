import { CountRequest } from '../search';

export class CountQuery {
  constructor(
    public readonly request: CountRequest,
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
