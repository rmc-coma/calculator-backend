import CalculatorDomain from "../..";

describe("Calculator service", () => {
    it("should work for a simple addition", () => {
        const terms = [1, "+", 1];
        const sum = CalculatorDomain.Service.calculate(terms);
        expect(sum).toBe(2);
    });

    it("should work for a simple substraction", () => {
        const terms = [1, "-", 1];
        const sum = CalculatorDomain.Service.calculate(terms);
        expect(sum).toBe(0);
    });

    it("should work for a simple multiplication", () => {
        const terms = [2, "*", 2];
        const sum = CalculatorDomain.Service.calculate(terms);
        expect(sum).toBe(4);
    });

    it("should work for a simple division", () => {
        const terms = [2, "/", 2];
        const sum = CalculatorDomain.Service.calculate(terms);
        expect(sum).toBe(1);
    });

    it("should work for mixed operators", () => {
        const terms = [2, "*", 2.5, "-", 2, "/", 2, "+", 3, "*", 4, "*", 2, "/", 2];
        const sum = CalculatorDomain.Service.calculate(terms);
        expect(sum).toBe(16);
    });

    it("should throw error for invalid input with invalid operator", () => {
        const terms = [2, "*", 2.5, "-", 2, "/", 2, "?", 3, "*", 4, "*", 2, "/", 2];
        let error;
        try {
            CalculatorDomain.Service.calculate(terms);
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("Invalid input");
    });

    it("should throw error for invalid input with invalid terms suite", () => {
        const terms = [2, "*", 2.5, "-", 2, "/", 2, 1, 3, "*", 4, "*", 2, "/", 2];
        let error;
        try {
            CalculatorDomain.Service.calculate(terms);
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("Invalid input");
    });
});
