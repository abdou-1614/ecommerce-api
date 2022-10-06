import { UserServiceException } from "./user-input.exception";

export class InvalidPasswordException extends UserServiceException {
      /** Throws exception with message 'Invalid current password'.
   *
   * Used when the user inputs the wrong current password when
   * trying to create a new password
   */
    constructor() {
        super('Invalid current password')
    }
}