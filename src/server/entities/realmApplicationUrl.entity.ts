import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RealmApplication } from './realmApplication.entity';

@Entity('RealmApplicationURLs')
export class RealmApplicationURL extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => RealmApplication, (realmApplication) => realmApplication.realmApplicationURLs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  realmApplication: RealmApplication;
}
