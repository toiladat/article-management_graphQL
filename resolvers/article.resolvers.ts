//resolvers: la ham xu ly tuong ung khi fe goi vao cac bien

import Article from "../models/article.model"
import Category from "../models/category-models"
export const articleResolvers = {
  Query: {
    getListArticle: async (_,args) => {
      //sort
      const sortKey=args.sortKey
      const sortValue=args.sortValue
      const sort={}
      if(sortKey&&sortValue){
        sort[`${sortKey}`]=sortValue
      }
      //end sort

      // pagination
      const limitItems:number= parseInt(args.limitItems)
      const page:number= parseInt(args.page)
      const skipItems=(page-1)*limitItems
      // end pagination
      
      //fillter
      const find={
        deleted:false
      }
      const fillterKey=args.fillterKey
      const fillterValue=args.fillterValue
      if(fillterKey&& fillterValue)
        find[fillterKey]=fillterValue
      //end fillter

      //search
      const keyword=args.keyword;
      if(keyword){
        const regex=new RegExp(keyword,'i');
        find['title']=regex
      }
      //end search


      const articles = await Article.find(find)
      .limit(limitItems)
      .skip(skipItems)
      .sort(sort)
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
  Article:{ // định nghĩa các trường k có trong csdl
    category:async(article,_)=>{ //2 params (ket qua tra ve cua cau truy van cha) ,(params truyen tren typedefs)
      const id=article.categoryId
      const category= await Category.findOne({
        _id:id,
        deleted:false
      })
      console.log(category);
      
      return category
      
    }
  },
  Mutation:{
    createArticle:async(_,args)=>{
      const article=args.article
      const newArticle= new Article(article);
      await newArticle.save();
      return newArticle
    },
    deleteArticle:async (_,args)=>{
      const id=args.id;
      await Article.updateOne({
        _id:id
      },{
        deleted:true
      })
      return {
        code:200,
        message:"Xoa thanh cong"
      };
    },
    updateArticle:async(_,args)=>{
      const id=args._id;
      await Article.updateOne({
        _id:id
      }, args.article
      )
      return {
        code:200,
        message:"Cap nhat thanh cong"
      }
    }
  }
}