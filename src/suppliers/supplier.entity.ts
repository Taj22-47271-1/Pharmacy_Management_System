import { Medicine } from '../medicines/medicine.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @OneToMany(() => Medicine, (medicine) => medicine.supplier)
  medicines!: Medicine[];
}