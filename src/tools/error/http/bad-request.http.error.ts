import { HttpError } from "./http.error";

export class BadRequestHttpError extends HttpError {
    public static readonly code = 400;
    public static readonly defaultMessage =
        "The server cannot or will not process the request due to an apparent client error.";
    public static readonly defaultName = "Bad Request";
    constructor(
        message: string = BadRequestHttpError.defaultMessage,
        name: string = BadRequestHttpError.defaultName,
        stack?: string
    ) {
        super(BadRequestHttpError.code, name, message, stack);
    }
}
