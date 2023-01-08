import { HttpError } from "./http.error";

export class UnauthorizedHttpError extends HttpError {
    public static readonly code = 401;
    public static readonly defaultMessage =
        "The user does not have valid authentication credentials for the target resource.";
    public static readonly defaultName = "Unauthorized";
    constructor(
        message: string = UnauthorizedHttpError.defaultMessage,
        name: string = UnauthorizedHttpError.defaultName,
        stack?: string
    ) {
        super(UnauthorizedHttpError.code, name, message, stack);
    }
}
