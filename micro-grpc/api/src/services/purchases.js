const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const loaderConfig = require('../config/proto');

const purchasesDef = protoLoader.loadSync(
  path.resolve(__dirname, '..', 'pb', 'purchases.proto'),
  loaderConfig
);

const purchases = grpc.loadPackageDefinition(purchasesDef);

const purchasesClient = new purchases.PurchasesService(
  'localhost:3335',
  grpc.credentials.createInsecure()
);

module.exports = purchasesClient;
