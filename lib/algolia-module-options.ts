import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { ClientOptions } from 'algoliasearch';

export interface AlgoliaModuleOptions {
  applicationId: string;
  apiKey: string;
  clientOptions?: ClientOptions;
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
