import { Request, Response } from "express";
import { BadRequestHttpError } from "tools/error/http";
import CalculatorDomain from "../domain";

function postEquation(
    request: Request<
        {
            [key: string]: string;
        },
        string,
        { terms: Array<number | "+" | "-" | "*" | "/"> } | undefined
    >,
    response: Response<string>,
    next: (err?: unknown) => void
): void {
    if (!CalculatorDomain.Validators.validateCalculateInput(request.body?.terms)) {
        next(
            new BadRequestHttpError(
                "'terms' argument should be an array of numbers and operators, starting with a number, and alternating numbers and operators"
            )
        );
        return;
    }
    const result = CalculatorDomain.Service.calculate(request.body!.terms);
    response.status(200).send(result.toString());
    next();
}

export default { postEquation };
