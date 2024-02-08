import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageCapture } from '../schemas/webcam.schema';
import { Model } from 'mongoose';
import { CaptureDto } from 'src/dto/capture.dto';

@Injectable()
export class WebcamService {
  constructor(
    @InjectModel(ImageCapture.name) private taskModel: Model<ImageCapture>,
  ) {}

  async capture(captureImage: CaptureDto) {
    const newImage = new this.taskModel(captureImage);
    return newImage.save();
  }
}
