import { Handler, NextFunction, Request, Response } from "express";
import { Config } from "tools/utils/config.utils";

const assessHeadersValidity = (res: Response): Error | undefined =>
    [
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Expose-Headers",
        "Access-Control-Allow-Methods",
    ].reduce((error: Error | undefined, headerName: string) => {
        if (
            res.getHeader("Access-Control-Allow-Credentials") === "true" &&
            res.getHeader(headerName) === "*"
        ) {
            if (!error) {
                error = new Error();
            }
            error.message +=
                `${error.message.length > 0 ? ", " : "Config error : "}` +
                `When 'Access-Control-Allow-Credentials' is set to true, wildcard (*) can't be used for '${headerName}'`;
        }
        return error;
    }, undefined);

export const createCORSHeadersHandler: () => Handler =
    () => (req: Request, res: Response, next: NextFunction) => {
        res.header(
            "Access-Control-Allow-Origin",
            Config.get("cors").allowedOrigin ??
                req.headers["origin"] ??
                req.headers["referer"]?.slice(0, -1) ??
                "*"
        );
        if (!Config.get("cors").allowedOrigin || Config.get("cors").varyingOrigin) {
            res.header("Vary", "Origin");
        }
        res.header(
            "Access-Control-Allow-Credentials",
            Config.get("cors").allowCredentials.toString() ?? "false"
        );
        res.header(
            "Access-Control-Allow-Headers",
            Config.get("cors").allowedHeaders.join(", ") ??
                req.headers["Access-Control-Request-Headers"] ??
                "*"
        );
        res.header(
            "Access-Control-Expose-Headers",
            Config.get("cors").exposedHeaders.join(", ") ?? "*"
        );
        res.header(
            "Access-Control-Allow-Methods",
            Config.get("cors").allowedMethods.join(", ") ??
                req.headers["access-control-request-method"] ??
                "*"
        );
        next(assessHeadersValidity(res));
    };
