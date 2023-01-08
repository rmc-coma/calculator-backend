import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpError } from "tools/error/http/http.error";
import { InternalServerErrorHttpError } from "tools/error/http/internal-server-error.http.error";

export const createErrorHandler: () => ErrorRequestHandler =
    (): ErrorRequestHandler =>
    (
        rawError: HttpError | Error | string | unknown,
        _: Request,
        response: Response,
        __: NextFunction
    ) => {
        if (response.headersSent) {
            return;
        }
        let error: HttpError;
        if (rawError instanceof HttpError) {
            error = rawError;
        } else if (rawError instanceof Error) {
            error = new InternalServerErrorHttpError(
                InternalServerErrorHttpError.defaultMessage,
                InternalServerErrorHttpError.defaultName,
                rawError?.stack
            );
        } else if (typeof rawError === "string") {
            error = new InternalServerErrorHttpError(
                InternalServerErrorHttpError.defaultMessage + "\n" + rawError
            );
        } else {
            error = new InternalServerErrorHttpError();
        }
        console.error(error);
        response.status(error.code).send(error);
    };
