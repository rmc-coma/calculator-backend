import express, { Router } from "express";
import { createBodyParsingHandler } from "tools/middleware/body.middleware";
import { createCORSHeadersHandler } from "tools/middleware/cors.middleware";
import { createErrorHandler } from "tools/middleware/error.middleware";
import { createNotFoundHandler } from "tools/middleware/notfound.middleware";
import { Config } from "tools/utils/config.utils";
import { AppRoute } from "app.routes";
import { CalculatorRouter } from "modules/calculator";

async function main() {
    await Config.load("config.json");

    const v1Router: Router = Router().use(AppRoute.CALCULATOR, CalculatorRouter);

    express()
        .use(createCORSHeadersHandler())
        .use(createBodyParsingHandler())
        .use("/v1", v1Router)
        .use(createErrorHandler())
        .use(createNotFoundHandler())
        .listen(
            Config.get("port"),
            () => `⚡️[server]: Server is running on port ${Config.get("port")}`
        );
}

main().catch(
    (
        error:
            | string
            | { toJSON?: () => string; toString?: () => string }
            | undefined
            | null
    ) => {
        console.error(
            `Fatal error : ${
                typeof error === "string"
                    ? error
                    : error?.toString?.() ?? error?.toJSON?.() ?? JSON.stringify(error)
            }`
        );
    }
);
