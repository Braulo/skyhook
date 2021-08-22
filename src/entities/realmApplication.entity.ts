import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExternalProvider } from './externalProvider.entity';
import { Realm } from './realm.entity';
import { RealmApplicationURL } from './realmApplicationUrl.entity';
import { User } from './user.entity';

@Entity('RealmApplications')
export class RealmApplication extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;

  @Column()
  displayName: string;

  @OneToMany(() => User, (user) => user.realmApplication)
  users: User[];

  @ManyToOne(() => Realm, (realm) => realm.realmApplications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  realm: Realm;

  @OneToMany(() => RealmApplicationURL, (realmApplicationURL) => realmApplicationURL.realmApplication)
  realmApplicationURLs: RealmApplicationURL[];

  @OneToMany(() => ExternalProvider, (externalProvider) => externalProvider.realmApplication)
  externalProvider: ExternalProvider[];
}
