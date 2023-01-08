import { NextFunction, Request, RequestHandler, Response } from "express";
import { NotFoundHttpError } from "tools/error/http/not-found.http.error";

export const createNotFoundHandler: () => RequestHandler =
    () => (_: Request, response: Response, __: NextFunction) => {
        if (response.headersSent) {
            return;
        }
        const error = new NotFoundHttpError();
        response.status(error.code).send(error);
    };
