export class UserServiceException extends Error {
     /**
   * Used to extend another exception to make it
   * instanceof UserServiceInputException
   */
    constructor(message: string) {
        super(message)
    }
}