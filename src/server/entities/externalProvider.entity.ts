import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RealmApplication } from './realmApplication.entity';

@Entity('ExternalProvider')
export class ExternalProvider extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column()
  secret: string;

  @ManyToOne(() => RealmApplication, (realmApplication) => realmApplication.externalProvider)
  realmApplication: RealmApplication;
}
