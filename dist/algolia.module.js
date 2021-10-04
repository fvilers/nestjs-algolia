"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AlgoliaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgoliaModule = void 0;
const common_1 = require("@nestjs/common");
const algolia_client_provider_1 = require("./algolia-client.provider");
const algolia_constants_1 = require("./algolia.constants");
let AlgoliaModule = AlgoliaModule_1 = class AlgoliaModule {
    static register(options) {
        return {
            module: AlgoliaModule_1,
            providers: [
                (0, algolia_client_provider_1.createAlgoliaClient)(),
                { provide: algolia_constants_1.ALGOLIA_MODULE_OPTIONS, useValue: options },
            ],
        };
    }
    static registerAsync(options) {
        return {
            module: AlgoliaModule_1,
            imports: options.imports || [],
            providers: [(0, algolia_client_provider_1.createAlgoliaClient)(), ...this.createAsyncProviders(options)],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: algolia_constants_1.ALGOLIA_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: algolia_constants_1.ALGOLIA_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createAlgoliaOptions(); }),
            inject: [options.useExisting || options.useClass],
        };
    }
};
AlgoliaModule = AlgoliaModule_1 = __decorate([
    (0, common_1.Module)({})
], AlgoliaModule);
exports.AlgoliaModule = AlgoliaModule;
