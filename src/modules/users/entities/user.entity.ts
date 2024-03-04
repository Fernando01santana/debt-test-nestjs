// src/entities/User.ts
import { Debt } from 'src/modules/debts/entities/debt.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum LevelAcess {
  CUSTOMER = 'Customer',
  ADMIN = 'Admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: LevelAcess,
    default: LevelAcess.CUSTOMER,
  })
  type: LevelAcess;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  data_birthday: Date;

  @Column({ type: 'varchar', unique: true })
  document: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Debt, (debt) => debt.user)
  debts: Debt[];

  constructor(debtData: Partial<User>) {
    Object.assign(this, debtData);
  }
}
