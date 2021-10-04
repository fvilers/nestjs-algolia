"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlgoliaClient = void 0;
const algoliasearch_1 = require("algoliasearch");
const algolia_constants_1 = require("./algolia.constants");
const createAlgoliaClient = () => ({
    provide: algolia_constants_1.ALGOLIA_CLIENT,
    useFactory: ({ apiKey, appId, options, }) => (0, algoliasearch_1.default)(appId, apiKey, options),
    inject: [algolia_constants_1.ALGOLIA_MODULE_OPTIONS],
});
exports.createAlgoliaClient = createAlgoliaClient;
