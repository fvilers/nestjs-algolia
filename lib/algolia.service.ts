import { Injectable, Inject } from '@nestjs/common';
import { ALGOLIA_CLIENT } from './algolia.constants';
import { Client } from 'algoliasearch';

@Injectable()
export class AlgoliaService {
  constructor(@Inject(ALGOLIA_CLIENT) private readonly algoliaClient: Client) {}
}
