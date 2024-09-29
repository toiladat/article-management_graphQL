import {  gql } from 'apollo-server-express';

  //typdefs : chi dinh cac ham ma fe muon lay
  //type Query : dinh nghia ra cac truong fe duoc lay
export  const typeDefs = gql`
    type Query {
      hello:String
    }
  `;
