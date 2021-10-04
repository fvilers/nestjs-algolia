import { Provider } from '@nestjs/common';
import algoliasearch, { SearchClient } from 'algoliasearch';
import { ALGOLIA_CLIENT, ALGOLIA_MODULE_OPTIONS } from './algolia.constants';
import type { AlgoliaModuleOptions } from './algolia-module-options';

export const createAlgoliaClient = (): Provider => ({
  provide: ALGOLIA_CLIENT,
  useFactory: ({
    apiKey,
    appId,
    options,
  }: AlgoliaModuleOptions): SearchClient =>
    algoliasearch(appId, apiKey, options),
  inject: [ALGOLIA_MODULE_OPTIONS],
});
