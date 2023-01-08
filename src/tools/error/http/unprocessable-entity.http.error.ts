import { HttpError } from "./http.error";

export class UnprocessableEntityHttpError extends HttpError {
    public static readonly code = 422;
    public static readonly defaultMessage =
        "The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.";
    public static readonly defaultName = "Unprocessable Entity";
    constructor(
        message: string = UnprocessableEntityHttpError.defaultMessage,
        name: string = UnprocessableEntityHttpError.defaultName,
        stack?: string
    ) {
        super(UnprocessableEntityHttpError.code, name, message, stack);
    }
}
