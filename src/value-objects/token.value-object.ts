import { ValueObject } from '../base-classes/value-object.base';
import { DateVO } from './date.value-object';
import { v4 as uuidV4 } from 'uuid';

export interface TokenProps {
  value: string;
  createdAt: DateVO;
  expiresAt?: DateVO;
}

export class Token extends ValueObject<TokenProps> {
  public get value(): string {
    return this.props.value;
  }

  public get createdAt(): DateVO {
    return this.props.createdAt;
  }

  public get expiresAt(): DateVO | undefined {
    return this.props.expiresAt;
  }

  public get expirable(): boolean {
    return this.expiresAt !== undefined;
  }

  public get expiresIn(): number | undefined {
    if (!this.props.expiresAt) {
      return undefined;
    }

    return Math.round(
      (this.props.expiresAt.value.getTime() - Date.now()) / 1000
    );
  }

  public get hasExpired(): boolean {
    return this.expirable && this.expiresIn !== undefined && this.expiresIn < 0;
  }

  /**
   * Returns new Token instance with randomly generated Token value
   * @static
   * @param expiresIn Amount in seconds the token expires in from now. Skip to have indefinite valid tokens
   * @return {*}  {Token}
   */
  static generate(expiresIn?: number): Token {
    let expiresAt: DateVO | undefined;

    if (expiresIn) {
      expiresAt = DateVO.now().add(0, 0, expiresIn);
    }

    return new Token({
      value: uuidV4(),
      createdAt: DateVO.now(),
      expiresAt,
    });
  }

  protected validate(): void {
    //
  }
}
