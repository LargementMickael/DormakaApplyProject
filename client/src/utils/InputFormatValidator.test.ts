import { InputFormatValidator } from "./InputFormatValidator";

test("InputFormatValidator with matching value", () => {
    expect(InputFormatValidator('ABCDEFG')).toEqual(true);
});

test("InputFormatValidator with non matching value", () => {
    expect(InputFormatValidator('123')).toEqual(false);
});