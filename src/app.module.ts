import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { RenderModule } from './render/render.module';

@Module({
  imports: [RenderModule.forRoot(), ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
