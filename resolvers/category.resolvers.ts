//resolvers: la ham xu ly tuong ung khi fe goi vao cac bien

import Article from "../models/article.model"
import Category from "../models/category-models"
export const categoryResolvers = {
  Query: {
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
  Mutation:{
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