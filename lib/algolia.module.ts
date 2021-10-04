import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  AlgoliaModuleOptions,
  AlgoliaModuleAsyncOptions,
  AlgoliaOptionsFactory,
} from './algolia-module-options';
import { createAlgoliaClient } from './algolia-client.provider';
import { ALGOLIA_MODULE_OPTIONS } from './algolia.constants';

@Module({})
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

  static registerAsync(options: AlgoliaModuleAsyncOptions): DynamicModule {
    return {
      module: AlgoliaModule,
      imports: options.imports || [],
      providers: [createAlgoliaClient(), ...this.createAsyncProviders(options)],
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
