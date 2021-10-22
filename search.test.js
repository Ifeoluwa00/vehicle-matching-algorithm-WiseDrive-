"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var searchFn_1 = __importDefault(require("./searchFn"));
describe("TEST", function () {
    test("should return invalid date, 13th month is specified.", function () {
        expect((0, searchFn_1.default)("520 i", "", "2010-13-13")).toBe("invalid date");
    });
    test("should return an empty array, a valid car type name is required.", function () {
        expect((0, searchFn_1.default)("5225D")).toHaveLength(0);
    });
    test("should return an empty array, a valid car model is required.", function () {
        expect((0, searchFn_1.default)("535I", "5 Grand Tollori (F07)")).toHaveLength(0);
    });
    test("should return an empty array, a car type name is required before adding the car model.", function () {
        expect((0, searchFn_1.default)("5 Gran Turismo (F07)")).toHaveLength(0);
    });
    test("should return an empty array, a car type name alongside the model is required before adding the specific date.", function () {
        expect((0, searchFn_1.default)("2003-10-5")).toHaveLength(0);
    });
    test("should return an empty array, car type name with this model was not constructed on this specific date.", function () {
        expect((0, searchFn_1.default)("3.0D", "X5 (E53)", "2008-10-5")).toHaveLength(0);
    });
    test("should return an empty array, car type name is invalid", function () {
        expect((0, searchFn_1.default)("3.0P", "X5 (E53)", "2003-10-5")).toHaveLength(0);
    });
    test("should return an array of object", function () {
        expect((0, searchFn_1.default)("3.0D")).toEqual([
            { carId: "17625", model: "X5 (E53)", typeName: "3.0 d" },
            { carId: "23282", model: "X5 (E70)", typeName: "3.0 d" },
        ]);
    });
    test("should return an array of object", function () {
        expect((0, searchFn_1.default)("3.0D", "X5 (E53)", "2005-10-05")).toEqual([
            { carId: "17625", model: "X5 (E53)", typeName: "3.0 d" },
        ]);
    });
    test("should return an array of object", function () {
        expect((0, searchFn_1.default)("3.0D", "X5 (E53)")).toEqual([
            { carId: "17625", model: "X5 (E53)", typeName: "3.0 d" },
        ]);
    });
    test("should return an array of object", function () {
        expect((0, searchFn_1.default)("3.0D", "X5 (E53)", "200510")).toBe("invalid date");
    });
});
