import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';

import { Cart } from '../../cart/entities/cart.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('medicines')
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

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    image!: string;

    @OneToMany(() => Cart, (cart) => cart.medicine)
    cartItems!: Cart[];

    @OneToMany(() => Order, (order) => order.medicine)
    orders!: Order[];
}