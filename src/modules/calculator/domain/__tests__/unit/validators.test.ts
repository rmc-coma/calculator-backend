import CalculatorDomain from "../..";

describe("Calculator validator", () => {
    it("should accept a valid term suite", () => {
        const terms = [2, "*", 2.5, "-", 2, "/", 2, "+", 3, "*", 4, "*", 2, "/", 2];
        const res = CalculatorDomain.Validators.validateCalculateInput(terms);
        expect(res).toBe(true);
    });

    it("should deny a term suite with invalid operator", () => {
        const terms = [2, "*", 2.5, "-", 2, "/", 2, "?", 3, "*", 4, "*", 2, "/", 2];
        const res = CalculatorDomain.Validators.validateCalculateInput(terms);
        expect(res).toBe(false);
    });

    it("should deny a term suite not alternating numbers and operators", () => {
        const terms = [2, "*", 2.5, 3, "-", 2, "/", 2, "+", 3, "*", 4, "*", 2, "/", 2];
        const res = CalculatorDomain.Validators.validateCalculateInput(terms);
        expect(res).toBe(false);
    });

    it("should deny a anything other than a term suite", () => {
        const terms = { key: "Hello world !" };
        const res = CalculatorDomain.Validators.validateCalculateInput(
            terms as unknown as Parameters<
                (typeof CalculatorDomain)["Validators"]["validateCalculateInput"]
            >[0]
        );
        expect(res).toBe(false);
    });
});
