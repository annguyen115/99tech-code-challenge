export interface UserPayload {
  id: string;
  username: string;
  fullName: string;
  iat?: number;
  exp?: number;
}
