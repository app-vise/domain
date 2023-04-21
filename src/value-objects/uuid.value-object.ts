import { v4 as uuidV4, validate } from 'uuid';
import { DomainPrimitive } from '../base-classes';
import { ArgumentInvalidException } from '../exceptions';
import { ID } from './id.value-object';

export class UUID extends ID {
  /**
   *Returns new ID instance with randomly generated ID value
   * @static
   * @return {*}  {ID}
   * @memberof ID
   */
  static generate(): UUID {
    return new UUID(uuidV4());
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!validate(value)) {
      throw new ArgumentInvalidException('Incorrect UUID format');
    }
  }

  /**
   *
   * @returns the first 16 alphanumeric characters of the UUID.
   */

  protected toTenantId(): string {
    const strippedId = this.value.replaceAll('-', '');
    return strippedId.substring(0, strippedId.length / 2);
  }
}
