import { Module } from '@nestjs/common';
import { RenderService } from './render.service';
import { RenderController } from './render.controller';
import { DynamicModule } from '@nestjs/common';

@Module({
  controllers: [RenderController],
  providers: [RenderService],
})
export class RenderModule {
  static forRoot(): DynamicModule {
    return {
      module: RenderModule,
      global: true,
      providers: [RenderService],
      exports: [RenderService],
    };
  }
}
