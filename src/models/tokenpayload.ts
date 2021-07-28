import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  email: string;
  username: string;
  userId: string;
  realmApplication: string;
}
