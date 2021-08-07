import { JwtPayload } from 'jsonwebtoken';

export interface RefreshTokenPayload extends JwtPayload {
  userId: string;
  realmApplicationId: string;
  tokenVersion: number;
}
