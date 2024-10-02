"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypedefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypedefs = (0, apollo_server_express_1.gql) `
  type User{
    fullName:String,
    email:String,
    token:String,
    code:Int,
    message:String
  }
  input RegisterInput{
    fullName:String,
    email:String,
    password:String
  }
  input LoginInput{
    email:String,
    password:String
  }

  type Query{
    getUser(token:String):User
  }
  type Mutation{
    register(user:RegisterInput):User,
    login(user:LoginInput):User
  }

`;
