import { RenderException } from './render-exception';
import { RenderService } from './render.service';

export class RenderPart {
  private template = '';

  private constructor(private readonly service: RenderService) {}

  static create(service: RenderService, templateFile: string): RenderPart {
    return new RenderPart(service).useTemplate(templateFile);
  }

  private useTemplate(templateFile: string): this {
    if (!templateFile.includes('.hbs')) {
      templateFile = `${templateFile}.hbs`;
    }
    if (!this.service.existsTemplate(templateFile)) {
      throw new RenderException(
        `Invalid template file "${templateFile}". Check if exists`,
      );
    }

    this.template = templateFile;

    return this;
  }

  compile() {
    return this.service.compile(this.template);
  }
}
