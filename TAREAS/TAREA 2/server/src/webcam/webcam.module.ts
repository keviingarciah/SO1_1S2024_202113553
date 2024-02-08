import { Module } from '@nestjs/common';
import { WebcamController } from './webcam.controller';
import { WebcamService } from './webcam.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageCapture, ImageCaptureSchema } from 'src/schemas/webcam.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ImageCapture.name,
        schema: ImageCaptureSchema,
      },
    ]),
  ],
  controllers: [WebcamController],
  providers: [WebcamService],
})
export class WebcamModule {}
