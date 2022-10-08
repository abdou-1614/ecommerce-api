/** Decrypted Refresh JWT Content */
export type RefreshTokenPayload = {
    /**
     * Token Subject, user ID used
     */
    userId: string;

    /** Token family for refresh token rotation
   *
   * Check https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation
   * @example "f0e25bbd-ea56-4c0f-9341-30c0270a1d78"
   */
    tokenFamily: string;
}