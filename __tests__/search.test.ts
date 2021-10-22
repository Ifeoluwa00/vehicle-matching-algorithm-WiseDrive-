import searchFn from "../src/searchFn";

describe("TEST", () => {
  test("should return invalid date, 13th month is specified.", () => {
    expect(searchFn("520 i", "", "2010-13-13")).toBe("invalid date");
  });

  test("should return an empty array, a valid car type name is required.", () => {
    expect(searchFn("5225D")).toHaveLength(0);
  });

  test("should return an empty array, a valid car model is required.", () => {
    expect(searchFn("535I", "5 Grand Tollori (F07)")).toHaveLength(0);
  });

  test("should return an empty array, a car type name is required before adding the car model.", () => {
    expect(searchFn("5 Gran Turismo (F07)")).toHaveLength(0);
  });

  test("should return an empty array, a car type name alongside the model is required before adding the specific date.", () => {
    expect(searchFn("2003-10-5")).toHaveLength(0);
  });

  test("should return an empty array, car type name with this model was not constructed on this specific date.", () => {
    expect(searchFn("3.0D", "X5 (E53)", "2008-10-5")).toHaveLength(0);
  });

  test("should return an empty array, car type name is invalid", () => {
    expect(searchFn("3.0P", "X5 (E53)", "2003-10-5")).toHaveLength(0);
  });

  test("should return an array of object", () => {
    expect(searchFn("3.0D")).toEqual([
      { carId: "17625", model: "X5 (E53)", typeName: "3.0 d" },
      { carId: "23282", model: "X5 (E70)", typeName: "3.0 d" },
    ]);
  });
  test("should return an array of object", () => {
    expect(searchFn("3.0D", "X5 (E53)", "2005-10-05")).toEqual([
      { carId: "17625", model: "X5 (E53)", typeName: "3.0 d" },
    ]);
  });
  test("should return an array of object", () => {
    expect(searchFn("3.0D", "X5 (E53)")).toEqual([
      { carId: "17625", model: "X5 (E53)", typeName: "3.0 d" },
    ]);
  });
  test("should return an array of object", () => {
    expect(searchFn("3.0D", "X5 (E53)", "200510")).toBe("invalid date");
  });
});
