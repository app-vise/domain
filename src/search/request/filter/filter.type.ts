import {
  //   BooleanFilter,
  //   DateTimeFilter,
  //   GeoFilter,
  //   NumericFilter,
  StringFilter,
} from '.';

export type FilterType = {
  AND?: FilterType[];
  OR?: FilterType[];
} & {
  search?: StringFilter;
  // TODO: Make wildcard typing work somehow
  // eslint-disable-next-line
  [index: string]: {
        equals: string;
        notEquals: string;
        contains: string;
        iContains: string;
        excludes: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
      }
    | StringFilter
    | undefined
    | Record<string, any>;
  // [index: string]: StringFilter | NumericFilter | BooleanFilter | GeoFilter | DateTimeFilter | FilterType[],
};
