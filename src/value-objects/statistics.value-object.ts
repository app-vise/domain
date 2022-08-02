import { ValueObject } from '../base-classes/value-object.base';
import { ArgumentInvalidException } from '../exceptions';

export interface StatisticsProps {
  [index: symbol]: number;
}

export interface UpdateStatisticsProps {
  [index: symbol]: number | undefined;
}

export class Statistics<
  TStatisticsProps extends StatisticsProps,
  TUpdateStatisticsProps extends UpdateStatisticsProps
> extends ValueObject<TStatisticsProps> {
  public update(props: TUpdateStatisticsProps): void {
    Object.entries(props).forEach(([key, value]) => {
      // Only update defined values
      if (value !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.props[key] += value;
      }
    });
  }

  protected validate(props: StatisticsProps): void {
    Object.entries(props).forEach(([key, value]) => {
      if (value < 0) {
        throw new ArgumentInvalidException(
          `Statistics for ${key} must be 0 or greater than 0`
        );
      }
    });
  }
}
