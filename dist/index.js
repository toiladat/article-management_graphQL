"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("./config/database");
const index_typedefs_1 = require("./typedefs/index.typedefs");
const index_resolvers_1 = require("./resolvers/index.resolvers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, database_1.connectDatabase)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: index_typedefs_1.typeDefs,
        resolvers: index_resolvers_1.resolvers
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app: app,
        path: '/graphql'
    });
    app.listen(port, () => {
        console.log('App listening on port ', port);
    });
});
startServer();
