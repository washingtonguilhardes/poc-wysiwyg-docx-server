import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import Handlebars, { TemplateDelegate } from 'handlebars';
import { resolve } from 'path';

@Injectable()
export class RenderService {
  private static VIEW_FOLDER = resolve(__dirname, '..', 'templates');
  private static ASSETS_FOLDER = resolve(__dirname, '..', 'assets');

  private hbs = Handlebars.create();
  private defaultLayout: TemplateDelegate<any>;

  constructor() {
    this.hbs.registerHelper('sum', function (context) {
      const { qtd, price } = context.hash;
      return (price * qtd).toFixed(2);
    });

    this.hbs.registerHelper('asset', function (context) {
      const { src } = context.hash;
      console.log(
        'asset',
        src,
        `file://${resolve(RenderService.ASSETS_FOLDER, src)}`,
      );
      return `http://localhost:3000/assets/${src}`;
    });
  }

  existsTemplate(template: string) {
    return existsSync(resolve(RenderService.VIEW_FOLDER, template));
  }

  useLayout(body: string) {
    if (!this.defaultLayout) {
      this.defaultLayout = this.hbs.compile(
        readFileSync(resolve(RenderService.VIEW_FOLDER, 'main.hbs')).toString(),
      );
    }
    return this.defaultLayout({ body });
  }

  compile(viewName: string) {
    try {
      if (!viewName.includes('.hbs')) {
        viewName = `${viewName}.hbs`;
      }
      return this.hbs.compile(
        readFileSync(resolve(RenderService.VIEW_FOLDER, viewName)).toString(),
      );
    } catch (e) {
      throw e;
    }
  }

  bind<T = any>(compliledView: TemplateDelegate<T>, params: T): string {
    return this.useLayout(compliledView(params));
  }
}
