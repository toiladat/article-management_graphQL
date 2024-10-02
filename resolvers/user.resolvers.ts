import User from "../models/user.models"
import { generateRandomString } from "../helper/generate.helper"
import md5 from 'md5'
export const userResolvers={
  Query:{
    
    getUser:async(_,args)=>{
      const token=args.token
      const existUser=await User.findOne({
        token:token,
        deleted:false
      })
      if(existUser){
        return {
          code:200,
          fullName:existUser.fullName,
          email:existUser.email,
        }
      }
      else
        return {
          code:400,
          message:"User not found"
        }

    }
  },
  Mutation:{
    register:async (_,args)=>{
      const {user}=args
      const existUser=await User.findOne({
        email:user.email,
        deleted:false
      })
      if(existUser){
        return {
          code:400,
          message:"User is exist"
        }
      }
      const dataUser={
        fullName:user.fullName,
        password:md5(user.password),
        email:user.email,
        token:generateRandomString(32)
      }
      const newUser=new User(dataUser);
      await newUser.save(); 
      
      return {
        id:newUser._id,
        email:newUser.email,
        fullName:newUser.fullName,
        token:newUser.token,
        code:200,
        message:'register successfully'
      }
      
    },
    login:async(_,args)=>{
      const {email,password}=args.user
      const existUser=await User.findOne({
        email:email,
        deleted:false
      })
      if(!existUser)
        return {
          code:400,
          message:"Email is incorrect"
      }
      if(md5(password)!=existUser.password)
        return {
          code:400,
          message:"Password is incorrect"
      }
      return{
        token:existUser.token,
        fullName:existUser.fullName,
        email:email,
        code:400,
        message:"Login successfully"
      }
    }
  }
}