"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_assert_exists_1 = __importDefault(require("ts-assert-exists"));
exports.default = {
    CONSUMER_KEY: ts_assert_exists_1.default(process.env.CONSUMER_KEY),
    CONSUMER_SECRET: ts_assert_exists_1.default(process.env.CONSUMER_SECRET),
    ACCESS_TOKEN: ts_assert_exists_1.default(process.env.ACCESS_TOKEN),
    ACCESS_TOKEN_SECRET: ts_assert_exists_1.default(process.env.ACCESS_TOKEN_SECRET),
    BOT_ID: ts_assert_exists_1.default(process.env.BOT_ID),
};
