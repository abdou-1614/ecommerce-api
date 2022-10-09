/** Describes the response received when the Login route is successfully called */
export class LoginResponseDto {
      /**
   * Access JWT Authentication token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NWFkMzNhNS0wYjk465fdgdfrtYjFmMS1hMTkwNzM0NWJmYzciLCJpYXQiOjE2NDg0NzU3MzEsImV4cCI6MTY0ODQ3NjYzMX0.h3z3JDvHOi6y5C_N0Kt6tdP2nWK_dHBZxioQn7VANNo"
   */
    accessToken: string

      /**
   * Refresh JWT Authentication token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NWFkMzNhNS0wYjk4LTQ2ODYtYjFmMS1hMTkwNzGT76JmYzciLCJpYXQiOjE2NDg0NzU3MzEsImV4cCI6MTY0ODQ3NjYzMX0.h3z3JDvHOi6y5C_N0Kt6tdP2nWK_dHBZxioQn7VANNo"
   */
    refreshToken: string
}