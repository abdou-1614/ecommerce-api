import { UserServiceException } from "./user-input.exception";

export class MissingPasswordException extends UserServiceException {
      /** Throws exception with message 'Please enter both new
   * password and current password'.
   *
   * Used when the user inputs only the current password
   * or the new password, but both are needed to update
   * the user password
   */
    constructor() {
        super('Please enter both new password and current password')
    }
}