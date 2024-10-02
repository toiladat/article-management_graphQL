"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_typedefs_1 = require("./article.typedefs");
const category_typedefs_1 = require("./category.typedefs");
const user_typedefs_1 = require("./user.typedefs");
exports.typeDefs = [article_typedefs_1.articleTypeDefs, category_typedefs_1.categoryTypeDefs, user_typedefs_1.userTypedefs];
