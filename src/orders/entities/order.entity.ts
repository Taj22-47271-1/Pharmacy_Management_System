import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Medicine } from '../../medicines/entities/medicine.entity';

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.orders)
    user!: User;

    @ManyToOne(() => Medicine, (medicine) => medicine.orders)
    medicine!: Medicine;

    @Column()
    quantity!: number;

    @Column('decimal')
    totalPrice!: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.CONFIRMED,
    })
    status!: OrderStatus;
}