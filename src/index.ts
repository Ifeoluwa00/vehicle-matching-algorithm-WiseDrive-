import searchFn from "./searchFn";

const args = process.argv;

const choiceArgs = ["type", "model", "date"];

const filterArgs = args.filter((arg) =>
  choiceArgs.includes(arg.split("=")[0].toLowerCase())
);

const argsObject = Object.fromEntries(
  filterArgs.map((elem) => elem.split("="))
);

if (argsObject.type === undefined) {
  console.log("Enter the type (check the vehicle typeName)");

  process.exit();
}

const { type, model, date } = argsObject;

console.log(searchFn(type, model, date));
