import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../roles/entities/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAd: Date;
}
