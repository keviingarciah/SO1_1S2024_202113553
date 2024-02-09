import { IsNotEmpty, IsString } from 'class-validator';

export class PhotoDto {
  @IsString()
  @IsNotEmpty()
  base64: string;
}
