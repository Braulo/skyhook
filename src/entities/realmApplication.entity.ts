import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Realm } from './realm.entity';
import { User } from './user.entity';

@Entity('RealmApplications')
export class RealmApplication extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;

  @OneToMany(() => User, (user) => user.realmApplication)
  users: User[];

  @ManyToOne(() => Realm, (realm) => realm.realmApplications)
  @JoinColumn()
  realm: Realm;
}
