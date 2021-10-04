import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import type { AlgoliaSearchOptions } from 'algoliasearch';

export interface AlgoliaModuleOptions {
  appId: string;
  apiKey: string;
  options: AlgoliaSearchOptions;
}
export interface AlgoliaOptionsFactory {
  createAlgoliaOptions(): Promise<AlgoliaModuleOptions> | AlgoliaModuleOptions;
}

export interface AlgoliaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AlgoliaOptionsFactory>;
  useClass?: Type<AlgoliaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AlgoliaModuleOptions> | AlgoliaModuleOptions;
  inject?: any[];
}
