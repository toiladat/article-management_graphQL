import { gql } from "apollo-server-express";

export const userTypedefs=gql`
  type User{
    fullName:String,
    email:String,
    token:String,
    code:Int,
    message:String
  }
  input RegisterInput{
    fullName:String,
    email:String,
    password:String
  }
  input LoginInput{
    email:String,
    password:String
  }
  type Mutation{
    register(user:RegisterInput):User,
    login(user:LoginInput):User
  }

`