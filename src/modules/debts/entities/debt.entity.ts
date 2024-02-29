// src/entities/Debt.ts
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('debt')
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  value: number;

  @Column({ type: 'varchar' })
  data_expire: Date;

  @Column({ type: 'varchar' })
  document: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.debts)
  @JoinColumn({ name: 'document', referencedColumnName: 'document' })
  user: User;

  constructor(debtData: Partial<Debt>) {
    Object.assign(this, debtData);
  }
}
