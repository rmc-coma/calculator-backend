import { HttpError } from "./http.error";

export class ServiceUnavailableHttpError extends HttpError {
    public static readonly code = 503;
    public static readonly defaultMessage = "The server cannot handle the request";
    public static readonly defaultName = "Service Unavailable";
    constructor(
        message: string = ServiceUnavailableHttpError.defaultMessage,
        name: string = ServiceUnavailableHttpError.defaultName,
        stack?: string
    ) {
        super(ServiceUnavailableHttpError.code, name, message, stack);
    }
}
