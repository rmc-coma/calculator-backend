import { HttpError } from "./http.error";

export class NotImplementedHttpError extends HttpError {
    public static readonly code = 501;
    public static readonly defaultMessage =
        "This endpoint is not ready for the beta version";
    public static readonly defaultName = "Not Implemented";
    constructor(
        message: string = NotImplementedHttpError.defaultMessage,
        name: string = NotImplementedHttpError.defaultName,
        stack?: string
    ) {
        super(NotImplementedHttpError.code, name, message, stack);
    }
}
