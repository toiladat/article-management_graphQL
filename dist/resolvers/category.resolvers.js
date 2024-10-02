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
exports.categoryResolvers = void 0;
const category_models_1 = __importDefault(require("../models/category-models"));
exports.categoryResolvers = {
    Query: {
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categoryList = yield category_models_1.default.find({
                deleted: false
            });
            return categoryList;
        }),
        getCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const id = args.id;
            const category = yield category_models_1.default.findOne({
                _id: id,
                deleted: false
            });
            return category;
        })
    },
    Mutation: {
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newCategory = new category_models_1.default(args.category);
            yield newCategory.save();
            return newCategory;
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const id = args.id;
            yield category_models_1.default.updateOne({
                _id: id
            }, {
                deleted: true
            });
            return {
                code: 200,
                message: "Xoa thanh cong"
            };
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const id = args.id;
            yield category_models_1.default.updateOne({
                _id: id
            }, args.category);
            return {
                code: 200,
                message: "update thanh cong"
            };
        })
    }
};
