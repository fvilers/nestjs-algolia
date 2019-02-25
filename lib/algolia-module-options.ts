import { ClientOptions } from 'algoliasearch';

export interface AlgoliaModuleOptions {
  applicationId: string;
  apiKey: string;
  clientOptions: ClientOptions;
}
