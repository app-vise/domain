import { ValueObject } from '../base-classes/value-object.base';
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '../exceptions';
import { Guard } from '../utils';

export interface ColorProps {
  red: number;
  green: number;
  blue: number;
}

export class Color extends ValueObject<ColorProps> {
  get red(): number {
    return this.props.red;
  }

  get green(): number {
    return this.props.green;
  }

  get blue(): number {
    return this.props.blue;
  }

  private static colorToHex(color: number) {
    const hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? '0' + hexadecimal : hexadecimal;
  }

  get hex(): string {
    return `#${Color.colorToHex(this.red)}${Color.colorToHex(
      this.green
    )}${Color.colorToHex(this.blue)}`;
  }

  get rgba(): string {
    return 'rgba(' + [this.red, this.green, this.blue].join(',') + ',1)';
  }

  static fromHex(hex: string): Color {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');

      return new Color({
        red: ((c as unknown as number) >> 16) & 255,
        green: ((c as unknown as number) >> 8) & 255,
        blue: (c as unknown as number) & 255,
      });
    }

    throw new ArgumentInvalidException('Bad Hex');
  }

  protected validate(props: ColorProps): void {
    if (!Guard.lengthIsBetween(props.red, 0, 255)) {
      throw new ArgumentOutOfRangeException('red');
    }

    if (!Guard.lengthIsBetween(props.green, 0, 255)) {
      throw new ArgumentOutOfRangeException('green');
    }

    if (!Guard.lengthIsBetween(props.blue, 0, 255)) {
      throw new ArgumentOutOfRangeException('blue');
    }
  }
}
