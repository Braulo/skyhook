import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RealmApplication } from './realmApplication.entity';
import { RealmRole } from './realmRole.entity';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  userName: string;

  @Column({
    default: false,
  })
  emailConfirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RealmApplication, (realmApplication) => realmApplication.users)
  @JoinColumn()
  realmApplication: RealmApplication;

  @ManyToMany(() => RealmRole, (realmRole) => realmRole.users)
  realmRoles: RealmRole[];
}
