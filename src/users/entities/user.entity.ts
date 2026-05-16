import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';

import { Cart } from '../../cart/entities/cart.entity';
import { Order } from '../../orders/entities/order.entity';

export enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CUSTOMER,
    })
    role!: UserRole;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true })
    address!: string;

    @OneToMany(() => Cart, (cart) => cart.user)
    cartItems!: Cart[];

    @OneToMany(() => Order, (order) => order.user)
    orders!: Order[];
}