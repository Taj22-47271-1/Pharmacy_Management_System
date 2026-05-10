import { Supplier } from '../suppliers/supplier.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column('decimal')
  price!: number;

  @Column()
  quantity!: number;

  @Column({ type: 'date' })
  expiryDate!: Date;

  @ManyToOne(() => Supplier, (supplier) => supplier.medicines, {
    onDelete: 'CASCADE',
  })
  supplier!: Supplier;
}