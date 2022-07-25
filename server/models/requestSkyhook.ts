import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface RequestSkyHook extends Request {
  user: User;
}
