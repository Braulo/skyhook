import { IsEmail, Length } from 'class-validator';
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
  @IsEmail()
  email: string;

  @Column({
    nullable: true,
  })
  @Length(3)
  password: string;

  @Column({
    nullable: true,
  })
  @Length(3, 30)
  username: string;

  @Column({
    default: false,
  })
  emailConfirmed: boolean;

  @Column({
    default: 0,
  })
  accessTokenVersion: number;

  @Column({
    default: 0,
  })
  refreshTokenVersion: number;

  @Column({ default: false })
  banned: boolean;

  @Column({
    nullable: true,
  })
  externalProviderId: string;

  @Column({
    nullable: true,
  })
  externalProviderName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RealmApplication, (realmApplication) => realmApplication.users, { onDelete: 'CASCADE' })
  @JoinColumn()
  realmApplication: RealmApplication;

  @ManyToMany(() => RealmRole, (realmRole) => realmRole.users, { onDelete: 'CASCADE' })
  realmRoles: RealmRole[];
}
