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
exports.userResolvers = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const generate_helper_1 = require("../helper/generate.helper");
const md5_1 = __importDefault(require("md5"));
exports.userResolvers = {
    Query: {
        getUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const token = args.token;
            const existUser = yield user_models_1.default.findOne({
                token: token,
                deleted: false
            });
            if (existUser) {
                return {
                    code: 200,
                    fullName: existUser.fullName,
                    email: existUser.email,
                };
            }
            else
                return {
                    code: 400,
                    message: "User not found"
                };
        })
    },
    Mutation: {
        register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const existUser = yield user_models_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (existUser) {
                return {
                    code: 400,
                    message: "User is exist"
                };
            }
            const dataUser = {
                fullName: user.fullName,
                password: (0, md5_1.default)(user.password),
                email: user.email,
                token: (0, generate_helper_1.generateRandomString)(32)
            };
            const newUser = new user_models_1.default(dataUser);
            yield newUser.save();
            return {
                id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                token: newUser.token,
                code: 200,
                message: 'register successfully'
            };
        }),
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const existUser = yield user_models_1.default.findOne({
                email: email,
                deleted: false
            });
            if (!existUser)
                return {
                    code: 400,
                    message: "Email is incorrect"
                };
            if ((0, md5_1.default)(password) != existUser.password)
                return {
                    code: 400,
                    message: "Password is incorrect"
                };
            return {
                token: existUser.token,
                fullName: existUser.fullName,
                email: email,
                code: 400,
                message: "Login successfully"
            };
        })
    }
};
