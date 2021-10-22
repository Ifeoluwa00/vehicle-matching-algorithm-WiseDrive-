import * as fs from "fs";

interface JsonInterface {
  carId: string;
  monthOfConstrFrom: string;
  monthOfConstrTo: string;
  model: string;
  typeName: string;
  id?: string;
  regDate?: string;
}

//This function conert CSV to json file

export function convertCsvToJson(filename: string): JsonInterface[] {
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
    } else {
      return line.trim().split(",");
    }
  });

  const jsonArr = processedLines.slice(1).map((column) => {
    return column.reduce(
      (acc, columnValue, index) => ({ ...acc, [header[index]]: columnValue }),
      {}
    );
  });

  return jsonArr as JsonInterface[];
}
