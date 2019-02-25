import { Module, DynamicModule } from '@nestjs/common';
import { AlgoliaService } from './algolia.service';
import { AlgoliaModuleOptions } from './algolia-module-options';
import { createAlgoliaClient } from './algolia-client.provider';
import { ALGOLIA_MODULE_OPTIONS } from './algolia.constants';

@Module({
  providers: [AlgoliaService],
  exports: [AlgoliaService],
})
export class AlgoliaModule {
  static register(options: AlgoliaModuleOptions): DynamicModule {
    return {
      module: AlgoliaModule,
      providers: [
        createAlgoliaClient(),
        { provide: ALGOLIA_MODULE_OPTIONS, useValue: options },
      ],
    };
  }
}
