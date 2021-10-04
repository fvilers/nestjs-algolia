import { Inject } from '@nestjs/common';
import { ALGOLIA_CLIENT } from './algolia.constants';

export function InjectAlgoliaClient() {
  return Inject(ALGOLIA_CLIENT);
}
