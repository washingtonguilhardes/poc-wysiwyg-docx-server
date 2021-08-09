import { RenderPart } from './render-part';
import { RenderService } from './render.service';

export class DocumentRender {
  private parts: RenderPart[] = [];
  private layout?: RenderPart;
  private constructor(private readonly service: RenderService) {}

  static create(service: RenderService) {
    return new DocumentRender(service);
  }

  useLayout(layoutName?: string): this {
    if (!layoutName) {
      this.layout = RenderPart.create(this.service, 'main');
    } else {
      this.layout = RenderPart.create(this.service, layoutName);
    }
    return this;
  }

  addPart(part: RenderPart): this {
    this.parts.push(part);
    return this;
  }

  join(params: any = {}) {
    const body = this.parts
      .map((part) => part.compile())
      .map((compiler) => compiler(params))
      .join('<hr /><br />');
    if (!this.layout) {
      return body;
    }
    return this.service.useLayout(body);
  }
}
