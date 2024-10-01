//resolvers: la ham xu ly tuong ung khi fe goi vao cac bien

import Article from "./models/article.model"
import Category from "./models/category-models"
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
    },
    getListCategory:async ()=>{
      const categoryList= await Category.find({
        deleted:false
      })
      return categoryList
    },
    getCategory:async(_,args)=>{
      const id=args.id;
      const category=await Category.findOne({
        _id:id,
        deleted:false
      })
      return category
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
    },
    createCategory:async(_,args)=>{
      const newCategory= new Category(args.category)
      await newCategory.save();
      return newCategory
    },
    deleteCategory:async(_,args)=>{
      const id=args.id;
      await Category.updateOne({
        _id:id
      },{
        deleted:true
      })
      return {
        code:200,
        message:"Xoa thanh cong"
      }
    },
    updateCategory:async(_,args)=>{
      const id= args.id;
      await Category.updateOne({
        _id:id
      },args.category)
      return {
        code:200,
        message:"update thanh cong"
      }
    }
  }
}