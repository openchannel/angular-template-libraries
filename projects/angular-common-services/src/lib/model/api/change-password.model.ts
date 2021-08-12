export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
  jwtRefreshToken?: string;
}
