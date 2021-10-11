# nestjs-algolia

The algolia NestJS module based on the official algolia package

## Support

If you use and like this library, feel free to support my Open Source projects.

[![donate](https://www.paypalobjects.com/en_US/BE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=JZ26X897M9V9L&currency_code=EUR)

## How to install

```
npm install nestjs-algolia
npm install --save-dev @types/algoliasearch
```

or

```
yarn add nestjs-algolia
yarn add -D @types/algoliasearch
```

## How to use

**Register the module**

```
import { AlgoliaModule } from 'nestjs-algolia';

@Module({
  imports: [
    AlgoliaModule.register({
      applicationId: 'YOUR_APPLICATION_ID',
      apiKey: 'YOUR_API_KEY',
    }),
  ],
})
export class AppModule {}
```

**Inject the service**

```
import { AlgoliaService } from 'nestjs-algolia';

@Injectable()
export class AppService {
  constructor(private readonly algoliaService: AlgoliaService) {}

  addRecordToIndex(
    indexName: string,
    record: any,
  ): Promise<algoliasearch.Task> {
    const index = this.algoliaService.initIndex(indexName);

    return index.addObject(record);
  }
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

### Use factory

```
AlgoliaModule.registerAsync({
  useFactory: () => ({
    applicationId: 'YOUR_APPLICATION_ID',
    apiKey: 'YOUR_API_KEY',
  }),
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```
AlgoliaModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    applicationId: configService.getString('ALGOLIA_APPLICATION_ID'),
    apiKey: configService.getString('ALGOLIA_API_KEY'),
  }),
  inject: [ConfigService],
}),
```

### Use class

```
AlgoliaModule.registerAsync({
  useClass: AlgoliaConfigService,
});
```

Above construction will instantiate `AlgoliaConfigService` inside `AlgoliaModule` and will leverage it to create options object.

```
class AlgoliaConfigService implements AlgoliaOptionsFactory {
  createAlgoliaOptions(): AlgoliaModuleOptions {
    return {
      applicationId: 'YOUR_APPLICATION_ID',
      apiKey: 'YOUR_API_KEY',
    };
  }
}
```

### Use existing

```
AlgoliaModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `AlgoliaModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## Versions

Use the following table to match this module with the NestJS version

| nestjs-algolia | nestjs |
| -------------- | ------ |
| 1.x            | 5.x    |
| 2.x            | 6.x    |
| 3.x            | 7.x    |
