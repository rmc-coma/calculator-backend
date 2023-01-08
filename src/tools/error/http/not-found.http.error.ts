import { HttpError } from "./http.error";

export class NotFoundHttpError extends HttpError {
    public static readonly code = 404;
    public static readonly defaultMessage =
        "The requested resource could not be found but may be available in the future.";
    public static readonly defaultName = "Not Found";
    constructor(
        message: string = NotFoundHttpError.defaultMessage,
        name: string = NotFoundHttpError.defaultName,
        stack?: string
    ) {
        super(NotFoundHttpError.code, name, message, stack);
    }
}
