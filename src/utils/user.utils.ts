import { Request, Response, NextFunction } from 'express';
import { RealmApplication } from '../entities/realmApplication.entity';
import { User } from '../entities/user.entity';

// Checks if the username is already taken in RealmApplication
export const checkUsernameInRealmApplication = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.query.clientId as string;
  const { username } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail({
      where: {
        clientId: clientId,
      },
    });

    const user = await User.findOne({
      where: { username },
      relations: ['realmApplication'],
    });

    // Todo Test
    if (user && user.realmApplication.id === realmApplication.id) {
      return res.status(400).json({
        message: `Username (${username}) already taken!`,
      });
    }

    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Checks if the email is already taken in RealmApplication
export const checkEmailInRealmApplication = async (req: Request, res: Response, next: NextFunction) => {
  const realmApplicationId = req.query.clientId as string;
  const { email } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail({
      where: {
        clientId: realmApplicationId,
      },
    });

    const user = await User.findOne({
      where: { email },
      relations: ['realmApplication'],
    });

    if (user && user.realmApplication.id === realmApplication.id) {
      return res.status(400).json({
        message: `E-Mail (${email}) already taken`,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
