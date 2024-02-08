import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class ImageCapture {
  @Prop({
    required: true,
    trim: true,
  })
  base64: string;
}

export const ImageCaptureSchema = SchemaFactory.createForClass(ImageCapture);
