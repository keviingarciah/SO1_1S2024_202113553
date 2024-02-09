import { Module } from '@nestjs/common';
import { WebcamController } from './webcam.controller';
import { WebcamService } from './webcam.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from 'src/schemas/webcam.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Photo.name,
        schema: PhotoSchema,
      },
    ]),
  ],
  controllers: [WebcamController],
  providers: [WebcamService],
})
export class WebcamModule {}
