import { JwtPayload } from 'jsonwebtoken';

export interface AccessTokenPayload extends JwtPayload {
  email: string;
  username: string;
  userId: string;
  realmApplication: string;
  accessTokenVersion: number;
}
