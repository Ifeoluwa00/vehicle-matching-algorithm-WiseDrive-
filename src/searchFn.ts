import { convertCsvToJson } from "./convertCsvToJson";

export default function searchFn(type: string, model = "", date = "") {
  // convert csv file to json
  let vehicleTypes = convertCsvToJson("vehicle_types.csv");
  let parsedDate: number;
  //if date is specifified
  if (date) {
    parsedDate = Number(
      date
        .split("-")
        .slice(0, date.split("-").length - 1)
        .join("")
    ); //convert date to number, if string

    //validate month
    let month = parsedDate % 100;
    month;
    if (month > 12 || month < 1) {
      return "invalid date";
    }
    //filter vehicles based on the date
    vehicleTypes = vehicleTypes.filter(
      (vehicle) =>
        parsedDate >= +vehicle.monthOfConstrFrom &&
        parsedDate <= +vehicle.monthOfConstrTo
    );
  }

  let match = [];
  if (model) {
    match = vehicleTypes.filter((vehicleObj: { [key: string]: any }) => {
      return (
        vehicleObj.typeName.replace(/\s+/g, "").toLowerCase() ===
          type.replace(/\s+/g, "").toLowerCase() &&
        vehicleObj.model.replace(/\s+/g, "").toLowerCase() ===
          model.replace(/\s+/g, "").toLowerCase()
      );
    });
  } else {
    match = vehicleTypes.filter((vehicleObj: { [key: string]: any }) => {
      return (
        vehicleObj.typeName.replace(/\s+/g, "").toLowerCase() ===
        type.replace(/\s+/g, "").toLowerCase()
      );
    });
  }

  const bmwModels = convertCsvToJson("vehicles_bmw.csv").map((vehicle) => ({
    model: vehicle.model,
    id: vehicle.id,
    regDate: vehicle.regDate,
  }));

  // filter out vehicles that are not bmw
  match = match.filter((vehicle) => {
    return bmwModels.some((bmwmodel) => {
      let modelMatch = vehicle.model
        .split(" ")
        .filter((elem) => !elem.includes(")") && !elem.includes("("))
        .every((item) => bmwmodel.model.includes(item));

      let bmwmodelDate = Number(
        bmwmodel
          .regDate!.split(" ")[0]
          .split("-")
          .slice(0, bmwmodel.regDate!.split(" ")[0].split("-").length - 1)
          .join("")
      );

      return modelMatch;
    });
  });

  //return vehicle Ids
  return match.map((obj) => {
    let carObj = {
      carId: obj.carId,
      model: obj.model,
      typeName: obj.typeName,
    };
    return carObj;
  });
}
