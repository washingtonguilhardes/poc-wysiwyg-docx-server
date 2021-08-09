import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { RenderService } from 'src/render/render.service';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
  imports: [RenderService],
})
export class ExampleModule {}
