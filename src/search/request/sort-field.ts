import { SortDirection } from './sort-direction-enum';

export interface SortField {
  field: string;
  direction: SortDirection;
}
