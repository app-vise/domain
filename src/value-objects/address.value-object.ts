import { ValueObject } from '../base-classes/value-object.base';
import { Guard } from '../utils';
import { ArgumentOutOfRangeException } from '../exceptions';

export interface AddressProps {
  street: string;
  postalCode: string;
  locality: string;
  country: string;
}

export class Address extends ValueObject<AddressProps> {
  get street(): string {
    return this.props.street;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  get locality(): string {
    return this.props.locality;
  }

  get country(): string {
    return this.props.country;
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules
   */
  protected validate(props: AddressProps): void {
    if (!Guard.lengthIsBetween(props.street, 2, 50)) {
      throw new ArgumentOutOfRangeException('street is out of range');
    }
    if (!Guard.lengthIsBetween(props.postalCode, 2, 10)) {
      throw new ArgumentOutOfRangeException('postalCode is out of range');
    }
    if (!Guard.lengthIsBetween(props.locality, 2, 50)) {
      throw new ArgumentOutOfRangeException('locality is out of range');
    }
    if (!Guard.lengthIsBetween(props.country, 2, 50)) {
      throw new ArgumentOutOfRangeException('country is out of range');
    }
  }
}
