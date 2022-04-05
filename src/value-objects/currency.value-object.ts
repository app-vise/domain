import { ValueObject } from '../base-classes/value-object.base';

export enum CurrencySymbol {
  USD = '$',
  EUR = '€',
}

export interface CurrencyProps {
  amount: number;
  symbol: CurrencySymbol;
  separator: string;
  decimal: string;
  precision: number;
  pattern: string;
  negativePattern: string;
  increment?: number; // TODO: Use for rounding
}

export class Currency extends ValueObject<CurrencyProps> {
  static create(
    amount: number,
    symbol: CurrencySymbol = CurrencySymbol.USD,
    separator = ',',
    decimal = '.',
    precision = 2,
    pattern = '!#',
    negativePattern = '-!#'
  ): Currency {
    return new Currency({
      amount,
      symbol,
      separator,
      decimal,
      precision,
      pattern,
      negativePattern,
    });
  }

  static clone(currency: Currency, amount?: number): Currency {
    return new Currency({
      amount: amount ?? currency.amount,
      symbol: currency.symbol,
      separator: currency.separator,
      decimal: currency.decimal,
      precision: currency.precision,
      pattern: currency.pattern,
      negativePattern: currency.negativePattern,
    });
  }

  static USD(amount: number): Currency {
    return Currency.create(amount);
  }

  static EUR(amount: number): Currency {
    return new Currency({
      amount: amount,
      symbol: CurrencySymbol.EUR,
      separator: '.',
      decimal: ',',
      precision: 2,
      pattern: '! #',
      negativePattern: '-! #',
    });
  }

  // public parse(amount: string): Currency {
  //
  // }

  /**
   * Returns the cent amount.
   * @returns {number}
   */
  get cents(): number {
    return ~~(this.props.amount % this.props.precision);
  }

  /**
   * Get amount with precision
   */
  get amount(): number {
    return Currency.roundTo(this.props.amount);
  }

  get symbol(): CurrencySymbol {
    return this.props.symbol;
  }

  get separator(): string {
    return this.props.separator;
  }

  get decimal(): string {
    return this.props.decimal;
  }

  get precision(): number {
    return this.props.precision;
  }

  get pattern(): string {
    return this.props.pattern;
  }

  get negativePattern(): string {
    return this.props.negativePattern;
  }

  /**
   * Adds amounts together.
   * @param {number | Currency} amount
   * @returns {Currency}
   */
  public add(amount: number): Currency;
  public add(amount: Currency): Currency;
  public add(amount: number | Currency): Currency {
    const amountToAdd: number =
      amount instanceof Currency ? amount.amount : <number>amount;
    return Currency.clone(this, (this.props.amount += amountToAdd));
  }

  /**
   * Subtracts amount.
   * @param {number | Currency} amount
   * @returns {Currency}
   */
  public subtract(amount: number): Currency;
  public subtract(amount: Currency): Currency;
  public subtract(amount: number | Currency): Currency {
    const subtractionAmount =
      amount instanceof Currency ? amount.amount : <number>amount;
    return Currency.clone(this, (this.props.amount -= subtractionAmount));
  }

  /**
   * Multiplies amounts.
   * @param {number | Currency} amount
   * @returns {Currency}
   */
  public multiply(amount: number): Currency;
  public multiply(amount: Currency): Currency;
  public multiply(amount: number | Currency): Currency {
    const multiplyAmount =
      amount instanceof Currency ? amount.amount : <number>amount;
    return Currency.clone(this, (this.props.amount *= multiplyAmount));
  }

  /**
   * Divides amount.
   * @param {number | Currency} amount
   * @returns {Currency}
   */
  public divide(amount: number): Currency;
  public divide(amount: Currency): Currency;
  public divide(amount: number | Currency): Currency {
    const divideAmount =
      amount instanceof Currency ? amount.amount : <number>amount;
    return Currency.clone(this, (this.props.amount /= divideAmount));
  }

  /**
   * Returns the dollar amount.
   * @returns {number}
   */
  public dollars(): number {
    return ~~this.props.amount;
  }

  /**
   * Formats the amount as a string according to the formatting settings.
   * @returns {string}
   */
  public format(): string {
    const groupRegex = /(\d)(?=(\d{3})+\b)/g;

    const split = ('' + this.props.amount).replace(/^-/, '').split('.');
    const dollars = split[0];
    const cents = split[1];

    return (this.props.amount >= 0 ? this.pattern : this.negativePattern)
      .replace('!', this.symbol)
      .replace(
        '#',
        dollars.replace(groupRegex, '$1' + this.separator) +
          (cents ? this.decimal + cents : '')
      );
  }

  private static roundTo(amount: number, decimals = 2) {
    return +(Math.round(Number(amount + `e+${decimals}`)) + `e-${decimals}`);
  }

  protected validate(): void {
    //
  }
}
