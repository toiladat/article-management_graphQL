"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.categoryTypeDefs = (0, apollo_server_express_1.gql) `
    type Category{
      id:String,
      title:String,
      avatar:String
    }
    type Query {
      getListCategory:[Category],
      getCategory(id:String):Category
    }


    input CategoryInput{
      title:String,
      avatar:String,
      description:String
    }
    type Mutation{
      createCategory(category:CategoryInput):Category
      deleteCategory(id:String):Message
      updateCategory(id:String,category:CategoryInput):Message
    }
  `;
