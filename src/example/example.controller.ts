import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, writeFileSync } from 'fs';
import { resolve } from 'path';
import { AppService } from 'src/app.service';
import { RenderService } from 'src/render/render.service';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(
    private readonly renderService: RenderService,
    private readonly exService: ExampleService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/pdf')
  async findAll() {
    return createReadStream(await this.exService.export());
  }
}
