import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateMedicineDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  category!: string;

  @IsNumber()
  @Min(1)
  price!: number;

  @IsNumber()
  @Min(0)
  quantity!: number;

  @IsDateString()
  expiryDate!: Date;

  @IsNumber()
  supplierId!: number;
}