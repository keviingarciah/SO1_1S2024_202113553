import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from '../schemas/webcam.schema';
import { Model } from 'mongoose';
import { PhotoDto } from 'src/dto/capture.dto';

@Injectable()
export class WebcamService {
  constructor(@InjectModel(Photo.name) private webCamModel: Model<Photo>) {}

  async capture(captureImage: PhotoDto) {
    const newImage = new this.webCamModel(captureImage);
    return newImage.save();
  }

  getAll() {
    return this.webCamModel.find();
  }
}
