import { SelectionSet } from '../repository';

export class ItemQuery {
  constructor(
    public readonly id: string,
    public readonly selectionSet?: SelectionSet
  ) {}
}
