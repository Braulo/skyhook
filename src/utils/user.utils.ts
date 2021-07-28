import { Request, Response, NextFunction } from 'express';
import { RealmApplication } from '../entities/realmApplication.entity';
import { User } from '../entities/user.entity';

// Checks if the username is already taken in RealmApplication
export const checkUsernameInRealmApplication = async (req: Request, res: Response, next: NextFunction) => {
  const { realmApplicationId } = req.params;
  const { username } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId);

    const user = await User.findOne({
      where: { username },
      relations: ['realmApplication'],
    });

    if (user && user.realmApplication.id === realmApplication.id) {
      return res.status(400).json('Username already taken');
    }
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Checks if the email is already taken in RealmApplication
export const checkEmailInRealmApplication = async (req: Request, res: Response, next: NextFunction) => {
  const { realmApplicationId } = req.params;
  const { email } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId);

    const user = await User.findOne({
      where: { email },
      relations: ['realmApplication'],
    });

    if (user && user.realmApplication.id === realmApplication.id) {
      return res.status(400).json('Email already taken');
    }
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
