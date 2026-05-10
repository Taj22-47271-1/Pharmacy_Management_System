import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  phone!: string;

  @IsNotEmpty()
  address!: string;
}