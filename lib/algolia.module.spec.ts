import { Test } from '@nestjs/testing';
import { AlgoliaModule } from './algolia.module';

describe('', () => {
  let module: AlgoliaModule;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      providers: [AlgoliaModule],
    }).compile();

    module = moduleFixture.get(AlgoliaModule);
  });

  it('defined', () => expect(module).toBeDefined());
});
