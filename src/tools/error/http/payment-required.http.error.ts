import { HttpError } from "./http.error";

export class PaymentRequiredHttpError extends HttpError {
    static readonly code = 402;
    static readonly defaultMessage = "License is invalid or expired";
    static readonly defaultName = "Invalid license";
    constructor(
        message: string = PaymentRequiredHttpError.defaultMessage,
        name: string = PaymentRequiredHttpError.defaultName,
        stack?: string
    ) {
        super(PaymentRequiredHttpError.code, name, message, stack);
    }
}
