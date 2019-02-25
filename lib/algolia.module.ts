import { Module } from '@nestjs/common';
import { AlgoliaService } from './algolia.service';

@Module({
  providers: [AlgoliaService],
  exports: [AlgoliaService],
})
export class AlgoliaModule {}
