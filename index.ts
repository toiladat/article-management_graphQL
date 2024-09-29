import  dotenv  from 'dotenv';
import express, {Express,Request,Response} from 'express'
import {connectDatabase}  from './config/database'
import Article from './models/article.model'
dotenv.config();
const app:Express=express();
const port:number|string=3000;
connectDatabase();

app.get('/articles',async (req:Request,res:Response)=>{
  const articles=await Article.find({
    deleted:false
  })
  res.json({
    articles:articles
  })
})

app.listen(port,()=>{
  console.log('App listening on port ',port);
  
})