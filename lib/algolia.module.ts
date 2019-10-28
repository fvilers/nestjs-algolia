import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  AlgoliaModuleAsyncOptions,
  AlgoliaModuleOptions,
  AlgoliaOptionsFactory,
} from './algolia-module-options';
import { ALGOLIA_MODULE_OPTIONS } from './algolia.constants';
import { createAlgoliaProvider } from './algolia-client.provider';
import { AlgoliaService } from './algolia.service';

@Module({
  providers: [AlgoliaService],
  exports: [ALGOLIA_MODULE_OPTIONS, AlgoliaService],
})
export class AlgoliaModule {
  static register(options: AlgoliaModuleOptions): DynamicModule {
    return {
      module: AlgoliaModule,
      providers: createAlgoliaProvider(options),
    };
  }

  static registerAsync(options: AlgoliaModuleAsyncOptions): DynamicModule {
    return {
      module: AlgoliaModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: AlgoliaModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AlgoliaModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ALGOLIA_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: ALGOLIA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AlgoliaOptionsFactory) =>
        await optionsFactory.createAlgoliaOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
