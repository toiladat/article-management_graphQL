import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express'
//ApolloServer dùng để code graphql bên server
// gql dùng để viết truy vấn
import { ApolloServer, gql } from 'apollo-server-express';
import { connectDatabase } from './config/database'

import { typeDefs } from './typedefs';
import {resolvers} from './resolvers'
import Article from './models/article.model'
dotenv.config();
const app: Express = express();
const port: number | string = 3000;

const startServer = async () => {

  connectDatabase();

  //Graphql

  //khoi tao 
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })
  // phai dung await
  await apolloServer.start();
  // dinh nghia bat buoc truyen vao 2 params, path la api khi fe vao do thi co the truy van
  apolloServer.applyMiddleware({
    app: app,
    path: '/graphql'
  })

  // app.get('/articles',async (req:Request,res:Response)=>{
  //   const articles=await Article.find({
  //     deleted:false
  //   })
  //   res.json({
  //     articles:articles
  //   })
  // })

  app.listen(port, () => {
    console.log('App listening on port ', port);

  })

}
startServer();
