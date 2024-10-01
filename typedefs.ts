import { gql } from 'apollo-server-express';

//typdefs : chi dinh cac ham ma fe muon lay
//type Query : dinh nghia ra cac truong fe duoc lay mac dinh phai co
//type _name : dinh nghia cac truong tra ve cho cac bien trong Query, tuong tu interface typeScript, cac bien fe co the lay

//type Mutation : them sua xoa
export const typeDefs = gql`
    type Article{
        id:String,
        title:String,
        avatar:String,
        description:String
    }
    type Message {
      code:Int,
      message:String
    }



    type Query {
      getListArticle:[Article],
      getArticle (id:String):Article
    }


   


    input ArticleInput{
        title:String,
        avatar:String,
        description:String
    }
    type Mutation{
      createArticle(article:ArticleInput):Article,
      deleteArticle(id:String):Message
      updateArticle(id:String,article:ArticleInput):Message
    }
  `;
