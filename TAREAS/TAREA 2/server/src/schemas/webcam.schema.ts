import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Photo {
  @Prop({
    required: true,
    trim: true,
  })
  base64: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
