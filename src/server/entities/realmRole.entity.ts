import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Realm } from './realm.entity';
import { User } from './user.entity';

@Entity('RealmRoles')
export class RealmRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  displayName: string;

  @ManyToOne(() => Realm, (realm) => realm.realmRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  realm: Realm;

  @ManyToMany(() => User, (user) => user.realmRoles)
  @JoinTable({
    name: 'users_realmRoles',
  })
  users: User[];
}
