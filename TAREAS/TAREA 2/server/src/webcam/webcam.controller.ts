import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { WebcamService } from './webcam.service';
import { CaptureDto } from 'src/dto/capture.dto';

@Controller('webcam')
export class WebcamController {
  constructor(private taskService: WebcamService) {}

  @Post()
  async create(@Body() captureImage: CaptureDto) {
    try {
      return await this.taskService.capture(captureImage);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('La tarea ya existe');
      }
      throw error;
    }
  }
}
