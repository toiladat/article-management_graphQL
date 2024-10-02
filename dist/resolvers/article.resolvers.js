"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleResolvers = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
const category_models_1 = __importDefault(require("../models/category-models"));
exports.articleResolvers = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const sortKey = args.sortKey;
            const sortValue = args.sortValue;
            const sort = {};
            if (sortKey && sortValue) {
                sort[`${sortKey}`] = sortValue;
            }
            const limitItems = parseInt(args.limitItems);
            const page = parseInt(args.page);
            const skipItems = (page - 1) * limitItems;
            const find = {
                deleted: false
            };
            const fillterKey = args.fillterKey;
            const fillterValue = args.fillterValue;
            if (fillterKey && fillterValue)
                find[fillterKey] = fillterValue;
            const keyword = args.keyword;
            if (keyword) {
                const regex = new RegExp(keyword, 'i');
                find['title'] = regex;
            }
            const articles = yield article_model_1.default.find(find)
                .limit(limitItems)
                .skip(skipItems)
                .sort(sort);
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const id = args.id;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Article: {
        category: (article, _) => __awaiter(void 0, void 0, void 0, function* () {
            const id = article.categoryId;
            const category = yield category_models_1.default.findOne({
                _id: id,
                deleted: false
            });
            console.log(category);
            return category;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const article = args.article;
            const newArticle = new article_model_1.default(article);
            yield newArticle.save();
            return newArticle;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const id = args.id;
            yield article_model_1.default.updateOne({
                _id: id
            }, {
                deleted: true
            });
            return {
                code: 200,
                message: "Xoa thanh cong"
            };
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const id = args._id;
            yield article_model_1.default.updateOne({
                _id: id
            }, args.article);
            return {
                code: 200,
                message: "Cap nhat thanh cong"
            };
        })
    }
};
