import { IsNotEmpty, IsString } from 'class-validator';

export class CaptureDto {
  @IsString()
  @IsNotEmpty()
  base64: string;
}
