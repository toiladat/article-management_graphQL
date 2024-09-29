 //resolvers: la ham xu ly tuong ung khi fe goi vao cac bien

import Article from "./models/article.model"

 export const resolvers = {
  Query: {
    getListArticle:async()=>{
      const articles= await Article.find({
        deleted:false
      })
      return articles
    }
  }
}