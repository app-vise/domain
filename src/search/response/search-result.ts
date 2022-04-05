export interface SearchResult<T> {
  cursor: string;
  item: T;
  [key: string]: unknown;
}
