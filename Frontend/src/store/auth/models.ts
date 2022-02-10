export interface AuthStateInterface {
  user: AuthUser;
}

export class AuthUser {
  username: string;
  avatar: string;
}
