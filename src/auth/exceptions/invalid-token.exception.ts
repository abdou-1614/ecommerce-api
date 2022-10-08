import { AuthServiceException } from "./auth-service.exception";

export  class InvalidRefreshTokens extends AuthServiceException {
    constructor() {
        super('Invalid Refresh Token')
    }
}