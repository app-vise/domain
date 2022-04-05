export class SelectionSet {
  constructor(
    // eslint-disable-next-line
    private selections: Record<string, any>
  ) {}

  /**
   * Check if fieldNames is selected in selectionSet
   *
   * @param field Dot separated field name: edges.node.id
   */
  public isSelected(field: string): boolean {
    return this._isSelected(field.split('.'), this.selections);
  }

  /**
   * Recursive check if provided fieldNames are present in selectionSet
   *
   * @param fieldNames Array of field names ['myField', 'nested', 'theField']
   * @param selections
   */
  private _isSelected(
    fieldNames: string[],
    // eslint-disable-next-line
    selections: Record<string, any>
  ): boolean {
    selections = selections ?? this.selections;

    // Current fieldNames is present
    if (selections[fieldNames[0]] != null) {
      if (
        typeof selections[fieldNames[0]] === 'boolean' &&
        selections[fieldNames[0]]
      ) {
        return true;
      }

      if (typeof selections[fieldNames[0]] === 'object') {
        if (fieldNames.length > 1) {
          // Recursively continue checking if there are more fieldNames
          return this._isSelected(
            fieldNames.slice(1),
            selections[fieldNames[0]]
          );
        }

        // No more fieldNames but current selector has children selected
        return true;
      }
    }

    return false;
  }
}
