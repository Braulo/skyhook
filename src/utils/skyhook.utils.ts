import { Realm } from "../entities/realm.entity"
import { RealmApplication } from "../entities/realmApplication.entity";
import { RealmRole } from "../entities/realmRole.entity";
import { User } from "../entities/user.entity";
import bcryptjs from 'bcryptjs';

export const createMasterRealm = async() =>{
    const masterRealm = Realm.create({
        id: '1',
        name: 'Master',
    });

    const masterRealmApplication = RealmApplication.create({
        clientId: 'Master Client',
        clientSecret: 'superdupersecret',
        realm: masterRealm,
        displayName: 'Master Realm Application',
        id: '1',
    })

    const masterAdminRealmRole = RealmRole.create({
        id: '1',
        name: 'RealmMasterAdmin',
        displayName: 'Master Role for Realm CRUD',
        realm: masterRealm
    })

    const adminUser = User.create({
        id: '1',
        email: 'admin@skyhook.com',
        password: await bcryptjs.hash('admin', 12),
        realmApplication: masterRealmApplication,
        username: 'admin',
        emailConfirmed: true,
        realmRoles: [masterAdminRealmRole]
    });

    await Realm.save(masterRealm);
    await RealmApplication.save(masterRealmApplication);
    await RealmRole.save(masterAdminRealmRole);
    await User.save(adminUser)

}