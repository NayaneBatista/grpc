const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const loaderConfig = require('../config/proto');

const usersDef = protoLoader.loadSync(
  path.resolve(__dirname, '..', 'pb', 'users.proto'),
  loaderConfig
);

const users = grpc.loadPackageDefinition(usersDef);

const usersClient = new users.UserService(
  'localhost:3334',
  grpc.credentials.createInsecure()
);

module.exports = usersClient;
