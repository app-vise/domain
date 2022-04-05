import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';

export class TokenExpiredException extends ExceptionBase {
  constructor(message = 'Token has expired') {
    super(message);
  }

  readonly code = ExceptionCodes.tokenExpired;
}
