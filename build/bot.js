"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var twit_1 = __importDefault(require("twit"));
var environment_1 = __importDefault(require("./config/environment"));
var bot = new twit_1.default({
    consumer_key: environment_1.default.CONSUMER_KEY,
    consumer_secret: environment_1.default.CONSUMER_SECRET,
    access_token: environment_1.default.ACCESS_TOKEN,
    access_token_secret: environment_1.default.ACCESS_TOKEN_SECRET,
});
exports.default = bot;
