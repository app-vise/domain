export class Guard {
  /**
   * Checks if value is empty. Accepts string, number, boolean, object and array.
   */
  static isEmpty(value: unknown): boolean {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return false;
    }

    if (typeof value === 'undefined' || value === null) {
      return true;
    }

    if (value instanceof Date) {
      return false;
    }

    if (value instanceof Object && !Object.keys(value).length) {
      return true;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }

      if (value.every((item) => Guard.isEmpty(item))) {
        return true;
      }
    }

    return value === '';
  }

  /**
   * Checks length range of a provided number/string/array
   */
  static lengthIsBetween(
    value: number | string | Array<unknown>,
    min: number,
    max: number
  ): boolean {
    if (Guard.isEmpty(value)) {
      throw new Error(
        'Cannot check length of a value. Provided value is empty'
      );
    }

    const valueLength =
      typeof value === 'number'
        ? Number(value).toString().length
        : value.length;

    return valueLength >= min && valueLength <= max;
  }

  /**
   * Checks length of a provided number/string/array
   */
  static lengthIs(
    value: number | string | Array<unknown>,
    length: number
  ): boolean {
    if (Guard.isEmpty(value)) {
      throw new Error(
        'Cannot check length of a value. Provided value is empty'
      );
    }

    const valueLength =
      typeof value === 'number'
        ? Number(value).toString().length
        : value.length;

    return valueLength === length;
  }

  /**
   * Checks minimum value of a provided number
   */
  static isGreatherThan(value: number, minValue: number): boolean {
    if (Guard.isEmpty(value)) {
      throw new Error(
        'Cannot check min value of a value. Provided value is empty'
      );
    }

    return value > minValue;
  }
}
