import { Body, ConflictException, Controller, Post, Get } from '@nestjs/common';
import { WebcamService } from './webcam.service';
import { PhotoDto } from 'src/dto/capture.dto';

@Controller('webcam')
export class WebcamController {
  constructor(private webCamService: WebcamService) {}

  @Post()
  async create(@Body() captureImage: PhotoDto) {
    try {
      return await this.webCamService.capture(captureImage);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('La tarea ya existe');
      }
      throw error;
    }
  }

  @Get()
  getAll() {
    return this.webCamService.getAll();
  }
}
