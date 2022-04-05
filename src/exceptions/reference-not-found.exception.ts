import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';

export class ReferenceNotFoundException extends ExceptionBase {
  constructor(message = 'Reference not found') {
    super(message);
  }

  readonly code = ExceptionCodes.referenceNotFound;
}
