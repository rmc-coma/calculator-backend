import { HttpError } from "./http.error";

export class InternalServerErrorHttpError extends HttpError {
    public static readonly code = 500;
    public static readonly defaultMessage = "An unexpected condition was encountered.";
    public static readonly defaultName = "Server Error";
    constructor(
        message: string = InternalServerErrorHttpError.defaultMessage,
        name: string = InternalServerErrorHttpError.defaultName,
        stack?: string
    ) {
        super(InternalServerErrorHttpError.code, name, message, stack);
    }
}
