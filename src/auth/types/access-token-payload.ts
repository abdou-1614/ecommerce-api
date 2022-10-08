/** Decrypted Access JWT content */

export type AccessTokenPayload = {

      /** Token subject, user ID used
   * @example "d6c24523-12df-4f33-9fd6-44dd5c499084"
   */
    sub: string

        /**
     * User Role
     * @example "user"
     */
    userRole: string
}