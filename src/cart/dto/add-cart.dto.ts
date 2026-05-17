import { IsNumber } from 'class-validator';

export class AddCartDto {
    @IsNumber()
    medicineId!: number;

    @IsNumber()
    quantity!: number;
}