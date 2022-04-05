import { ValueObject } from '../base-classes/value-object.base';

export interface PointProps {
  x: number;
  y: number;
}

export class Point extends ValueObject<PointProps> {
  get x(): number {
    return this.props.x;
  }

  get y(): number {
    return this.props.y;
  }

  protected validate(): void {
    //
  }
}
