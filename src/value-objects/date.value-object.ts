import { ValueObject } from '../base-classes/value-object.base';
import { ArgumentInvalidException } from '../exceptions';
import { DomainPrimitive } from '../base-classes';

export class DateVO extends ValueObject<Date> {
  constructor(value: Date | string | number) {
    const date = new Date(value);
    super({ value: date });
  }

  public get value(): Date {
    return this.props.value;
  }

  public static now(): DateVO {
    return new DateVO(Date.now());
  }

  public add(hours = 0, minutes = 0, seconds = 0): DateVO {
    const currentTime = this.props.value.getTime();

    const addHours = hours * 3600 * 1000;
    const addMinutes = minutes * 60 * 1000;
    const addSeconds = seconds * 1000;

    return new DateVO(currentTime + addHours + addMinutes + addSeconds);
  }

  public subtract(hours = 0, minutes = 0, seconds = 0): DateVO {
    const currentTime = this.props.value.getTime();

    const subtractHours = hours * 3600 * 1000;
    const subtractMinutes = minutes * 60 * 1000;
    const subtractSeconds = seconds * 1000;

    return new DateVO(
      currentTime - subtractHours - subtractMinutes - subtractSeconds
    );
  }

  protected validate({ value }: DomainPrimitive<Date>): void {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new ArgumentInvalidException('Incorrect date');
    }
  }
}
