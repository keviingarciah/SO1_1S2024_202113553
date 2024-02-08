import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebcamModule } from './webcam/webcam.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/so1tarea2'), WebcamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
