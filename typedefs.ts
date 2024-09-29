import {  gql } from 'apollo-server-express';

  //typdefs : chi dinh cac ham ma fe muon lay
  //type Query : dinh nghia ra cac truong fe duoc lay mac dinh phai co
  //type _name : dinh nghia cac truong tra ve cho cac bien trong Query, tuong tu interface typeScript, cac bien fe co the lay
export  const typeDefs = gql`
    type Article{
        id:String,
        title:String,
        avatar:String,
        description:String
    }

    type Query {
      getListArticle:[Article]
    }
  `;
