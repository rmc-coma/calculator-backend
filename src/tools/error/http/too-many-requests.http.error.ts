import { HttpError } from "./http.error";

export class TooManyRequestsHttpError extends HttpError {
    public static readonly code = 429;
    public static readonly defaultMessage =
        "The user has sent too many requests in a given amount of time.";
    public static readonly defaultName = "Too Many Requests";
    constructor(
        message: string = TooManyRequestsHttpError.defaultMessage,
        name: string = TooManyRequestsHttpError.defaultName,
        stack?: string
    ) {
        super(TooManyRequestsHttpError.code, name, message, stack);
    }
}
