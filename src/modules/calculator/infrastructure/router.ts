import { RequestHandler, Router } from "express";
import { HttpMethod } from "tools/types/http.types";
import CalculatorControllers from "./controllers";

const routes: Partial<{
    [method in keyof Pick<ReturnType<typeof Router>, HttpMethod>]: Array<
        readonly [string, RequestHandler]
    >;
}> = {
    post: [["/", CalculatorControllers.postEquation]],
};

export default Object.entries(routes).reduce((router, [method, methodRoutes]) => {
    methodRoutes.forEach(([path, controller]) =>
        router[method as HttpMethod](path, controller)
    );
    return router;
}, Router());
