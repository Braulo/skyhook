import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RealmApplication } from './realmApplication.entity';
import { RealmRole } from './realmRole.entity';

@Entity('Realms')
export class Realm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => RealmRole, (realmRole) => realmRole.realm)
  realmRoles: RealmRole[];

  @OneToMany(() => RealmApplication, (realmApplication) => realmApplication.realm)
  realmApplications: RealmApplication[];
}
