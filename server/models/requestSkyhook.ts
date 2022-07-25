import { Request } from 'express';
import { User } from '../../server/entities/user.entity';

export interface RequestSkyHook extends Request {
  user: User;
}
