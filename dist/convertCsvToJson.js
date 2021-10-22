"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCsvToJson = void 0;
const fs = __importStar(require("fs"));
//This function conert CSV to json file
function convertCsvToJson(filename) {
    //reading the json file using the traditional fs module
    const content = fs.readFileSync(filename, "utf-8");
    //removing white spaces in the data,converting the string to an array of string, each string on a new line and lastly eliminating empty lines
    const lines = content
        .trim()
        .split("\n")
        .filter((line) => line);
    //according to the csv data, we have headers, so i had to seperate the headers from the data and place it in a seperate array. White spaces was also trimmed.
    const header = lines[0].split(",").map((column) => column.trim());
    const processedLines = lines.map((line) => {
        if (line.replace(/[^,]/g, "").length !== header.length - 1) {
            let oddline = line.split('"');
            oddline = oddline.map((elem) => {
                let ans = elem[0] == "," ? elem.slice(1) : elem; //remove preceeding comma if any
                ans = ans.slice(-1) == "," ? ans.slice(0, ans.length - 1) : ans; // remove trailing comma if any
                return ans.trim();
            });
            let ans = oddline
                .map((elem) => (elem.includes(")") ? elem : elem.split(",")))
                .flat();
            return ans;
        }
        else {
            return line.trim().split(",");
        }
    });
    const jsonArr = processedLines.slice(1).map((column) => {
        return column.reduce((acc, columnValue, index) => ({ ...acc, [header[index]]: columnValue }), {});
    });
    return jsonArr;
}
exports.convertCsvToJson = convertCsvToJson;
