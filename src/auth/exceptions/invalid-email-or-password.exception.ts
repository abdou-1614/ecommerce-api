import { AuthServiceException } from "./auth-service.exception";

export class InvalidEmailOrPassword extends AuthServiceException {

    /**
     * Used When User Input Wrong Email Or Password
     */
    constructor() {
        super('Invalid E-mail Or Password')
    }
}