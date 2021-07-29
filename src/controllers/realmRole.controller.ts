import { Request, Response } from 'express';
import { Realm } from '../entities/realm.entity';
import { RealmRole } from '../entities/realmRole.entity';
import { User } from '../entities/user.entity';

// POST => /api/realmRole/realmID
// ToDo
const addRealmRoleToUserById = async (req: Request, res: Response) => {
  const { roleId, userId } = req.body;

  try {
    const user = await User.findOneOrFail(userId);
    const role = await RealmRole.findOneOrFail(roleId);

    user.realmRoles.push(role);

    const savedUser = User.save(user);
    return res.status(200).json(savedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// POST => /api/realmRole/realmID
const addRealmRoleToRealmById = async (req: Request, res: Response) => {
  const { realmId } = req.params;
  const { name, displayName } = req.body;

  try {
    const realm = await Realm.findOneOrFail(realmId);
    const realmRole = RealmRole.create({ name, displayName, realm });

    const savedRealmRole = await RealmRole.save(realmRole);

    return res.status(200).json(savedRealmRole);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// DELETE => /api/realmRole/realmID
const deleteRealmRoleById = async (req: Request, res: Response) => {
  const { realmRoleId } = req.params;

  try {
    const realmRole = await RealmRole.findOneOrFail(realmRoleId);
    const deletedRealmRole = await RealmRole.remove(realmRole);

    return res.status(200).json(deletedRealmRole);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { addRealmRoleToUserById, addRealmRoleToRealmById, deleteRealmRoleById };
