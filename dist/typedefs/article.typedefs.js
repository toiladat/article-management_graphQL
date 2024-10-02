"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.articleTypeDefs = (0, apollo_server_express_1.gql) `
    type Article{
        id:String,
        title:String,
        avatar:String,
        description:String,
        categoryId:String,
        category:Category
    }
    type Message {
      code:Int,
      message:String
    }
    type Query {
      getListArticle(
        sortKey:String,
        sortValue:String,
        limitItems:Int,
        page:Int,
        fillterKey:String,
        fillterValue:String
      ):[Article],
      getArticle (id:String):Article
    }



    input ArticleInput{
        title:String,
        avatar:String,
        description:String,
        categoryId:String,
        keyword:String
    }
    type Mutation{
      createArticle(article:ArticleInput):Article,
      deleteArticle(id:String):Message
      updateArticle(id:String,article:ArticleInput):Message
    }
  `;
