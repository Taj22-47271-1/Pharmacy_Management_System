import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Medicine } from '../../medicines/entities/medicine.entity';

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.cartItems)
    user!: User;

    @ManyToOne(() => Medicine, (medicine) => medicine.cartItems)
    medicine!: Medicine;

    @Column()
    quantity!: number;
}