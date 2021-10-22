"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchFn_1 = __importDefault(require("./searchFn"));
const args = process.argv;
const choiceArgs = ["type", "model", "date"];
const filterArgs = args.filter((arg) => choiceArgs.includes(arg.split("=")[0].toLowerCase()));
const argsObject = Object.fromEntries(filterArgs.map((elem) => elem.split("=")));
if (argsObject.type === undefined) {
    console.log("Enter the type (check the vehicle typeName)");
    process.exit();
}
const { type, model, date } = argsObject;
console.log((0, searchFn_1.default)(type, model, date));
