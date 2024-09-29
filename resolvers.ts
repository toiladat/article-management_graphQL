//resolvers: la ham xu ly tuong ung khi fe goi vao cac bien

import Article from "./models/article.model"

export const resolvers = {
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false
      })
      return articles
    },
    getArticle: async (_, args) => {
      //args giong nhu req.body
      const id = args.id
      const article = await Article.findOne({
        _id: id,
        deleted: false
      })
      return article
    }
  },
  Mutation:{
    createArticle:async(_,args)=>{
      const article=args.article
      const newArticle= new Article(article);
      await newArticle.save();
      return newArticle
    }
  }
}