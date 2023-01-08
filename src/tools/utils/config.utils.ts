import { readFile } from "fs/promises";

export class Config {
    private static _instance: Config;

    private readonly _values: {
        port: number;
        cors: {
            allowedOrigin: string;
            varyingOrigin: boolean;
            allowCredentials: boolean;
            allowedHeaders: string[];
            exposedHeaders: string[];
            allowedMethods: string[];
        };
    };

    private constructor() {
        this._values = {} as typeof this._values;
    }

    private static get instance() {
        if (!Config._instance) {
            Config._instance = new Config();
        }
        return Config._instance;
    }

    public static async load(path: string) {
        Object.assign(
            Config.instance._values,
            JSON.parse((await readFile(path)).toString()) as typeof Config.instance._values
        );
    }

    public static get<K extends keyof (typeof Config)["instance"]["_values"]>(
        key: K
    ): (typeof Config)["_instance"]["_values"][K] {
        return Config.instance._values[key];
    }
}
