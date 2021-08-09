import { Injectable, Logger } from '@nestjs/common';
import { RenderService } from 'src/render/render.service';
import { create } from 'html-pdf';
import { generatePdf } from 'html-pdf-node-ts';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { DocumentRender } from 'src/render/document-render';
import { RenderPart } from 'src/render/render-part';

@Injectable()
export class ExampleService {
  private logger: Logger;

  constructor(private readonly renderService: RenderService) {
    this.logger = new Logger('ExampleService');
  }

  async export(): Promise<string> {
    const user = {
      name: 'Giovana Bruna Alice',
      email:
        'claudiabrendarosangelabarros__claudiabrendarosangelabarros@gsw.com.br',
      phone: '(65) 98175-6279',
    };
    const products = [
      {
        name: 'Arroz',
        qtd: 1,
        price: 50,
        totalPrice: 50,
        description: `<b>Product description</b>`,
      },
      {
        name: 'Carne',
        qtd: 1,
        price: 80,
        totalPrice: 80,
      },
      {
        name: 'Feijão',
        qtd: 3,
        price: 95.6,
        totalPrice: 80,
      },
    ];

    try {
      const document = DocumentRender.create(this.renderService)
        .addPart(RenderPart.create(this.renderService, 'primeira'))
        .addPart(RenderPart.create(this.renderService, 'example'))
        .useLayout()
        .join({
          user,
          products,
        });

      const fileName = resolve(process.cwd(), 'out', `file.pdf`);
      await generatePdf(
        {
          content: document,
        },
        {
          format: 'A4',
          margin: { bottom: '20px', left: '50px', right: '80px', top: '50px' },
        },
      ).then((buffer) =>
        writeFileSync(resolve(process.cwd(), 'out', fileName), buffer, {
          encoding: 'utf-8',
        }),
      );
      console.log('DONE FILES', fileName);
      return fileName;
      return '';
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw e;
    }
  }
}
