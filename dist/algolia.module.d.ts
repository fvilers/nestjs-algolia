import { DynamicModule } from '@nestjs/common';
import {
  AlgoliaModuleOptions,
  AlgoliaModuleAsyncOptions,
} from './algolia-module-options';
export declare class AlgoliaModule {
  static register(options: AlgoliaModuleOptions): DynamicModule;
  static registerAsync(options: AlgoliaModuleAsyncOptions): DynamicModule;
  private static createAsyncProviders;
  private static createAsyncOptionsProvider;
}
