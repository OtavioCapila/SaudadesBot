"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./streams/limited");
require("./streams/unlimited");
var logger_1 = __importDefault(require("./logger"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = process.env.PORT || 3000;
app.listen(port, function () {
    logger_1.default.log("- SERVER - Escutando na porta " + port + " ");
});
