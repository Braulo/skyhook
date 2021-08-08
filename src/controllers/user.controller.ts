import { Request, Response } from 'express';
import { User } from '../entities/user.entity';

const getAllUsersByRealmId = async (req: Request, res: Response) => {
  const { realmId } = req.params;

  try {
    const realmUsers = await User.createQueryBuilder('users')
      .leftJoinAndSelect('users.realmRoles', 'roles')
      .innerJoinAndSelect('users.realmApplication', 'realmApplication')
      .innerJoin('realmApplication.realm', 'realm')
      .where('realm.id =:id', { id: realmId })
      .getMany();

    return res.status(200).json(realmUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id, email, username, realmRoles, realmApplication } = req.body;

  try {
    const user = await User.findOneOrFail(id);
    user.email = email || user.email;
    user.username = username || user.username;
    user.realmRoles = realmRoles || user.realmRoles;
    user.realmApplication = realmApplication || user.realmApplication;
    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const logoutUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneOrFail(userId);
    user.accessTokenVersion++;
    user.refreshTokenVersion++;
    await User.save(user);

    return res.status(200).json(true);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const banUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneOrFail(userId);
    user.banned = true;
    await User.save(user);

    return res.status(200).json(true);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const unbanUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneOrFail(userId);
    user.banned = false;
    await User.save(user);

    return res.status(200).json(true);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { getAllUsersByRealmId, updateUser, logoutUserById, banUserById, unbanUserById };
