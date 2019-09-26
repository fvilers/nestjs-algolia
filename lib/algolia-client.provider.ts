import { AlgoliaModuleOptions } from './algolia-module-options';
import { ALGOLIA_MODULE_OPTIONS } from './algolia.constants';

export function createAlgoliaProvider(options: AlgoliaModuleOptions): any[] {
  return [{ provide: ALGOLIA_MODULE_OPTIONS, useValue: options || {} }];
}
