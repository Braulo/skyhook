import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { RealmApplication } from '../entities/realmApplication.entity';
import { User } from '../entities/user.entity';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// GET => /api/user
const getAllUsers = async (req: Request, res: Response) => {
  res.json('yikes');
};

//GET => /api/user/register/:realmApplicationId
const registerUserInRealmApplication = async (req: Request, res: Response) => {
  const { realmApplicationId } = req.params;
  const { email, password, username } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId);

    const user = User.create({
      email,
      password: await bcryptjs.hash(password, 12),
      username,
      realmApplication,
    });

    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const createdUser = await User.save(user);
    const token = jwt.sign(
      {
        email,
        username,
        userId: createdUser.id,
        realmApplication: createdUser.realmApplication.id,
      },
      realmApplication.clientSecret,
      { expiresIn: '1h' },
    );
    return res.status(200).json({ createdUser, token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// POST => /aut/login
const loginUserForRealmApplication = async (req: Request, res: Response) => {
  const { realmApplicationId } = req.params;
  const { email, password } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId);
    const user = await User.findOneOrFail({
      where: { email, realmApplication },
      relations: ['realmApplication'],
    });

    const doPasswordsMatch = await bcryptjs.compare(password, user.password);
    if (!doPasswordsMatch) {
      return res.status(400).json('Wrong Password');
    }

    const token = jwt.sign(
      {
        email,
        username: user.username,
        userId: user.id,
        realmApplication: user.realmApplication.id,
      },
      realmApplication.clientSecret,
      { expiresIn: '1h' },
    );

    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { getAllUsers, registerUserInRealmApplication, loginUserForRealmApplication };
