import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';

export class InvalidStatusException extends ExceptionBase {
  constructor(message = 'Received an invalid status') {
    super(message);
  }

  readonly code = ExceptionCodes.invalidStatus;
}
