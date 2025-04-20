import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID, MinLength } from 'class-validator';
//dto data transfer object
export class CreateCarDto {
  @IsString({ message: 'The brand must be a string' })
  readonly brand: string;

  @IsString()
  @MinLength(3)
  readonly model: string;
  //   @IsNumber()

  @Type(() => Number)
  @IsNumber({}, { message: 'The SKU must be a number' })
  readonly sku: number;
}
