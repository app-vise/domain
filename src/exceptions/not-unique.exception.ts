import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';

export class NotUniqueException extends ExceptionBase {
  constructor(message = 'Not unique') {
    super(message);
  }

  readonly code = ExceptionCodes.notUnique;
}
