import { PreCompiler } from "gherking";
import { Document } from "gherkin-ast";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:replacer");

export type ReplacerConfig = {
    [key: string]: string;
};

export default class Replacer implements PreCompiler {
    config: ReplacerConfig;

    constructor(config: ReplacerConfig) {
        debug('Initialize(config: %o)', config);
        if (typeof config !== 'object') {
            throw new TypeError('Configuration is not an object: ' + config);
        }
        this.config = config;
    }

    onDocument(d: Document): void {
        for (const key in this.config) {
            const toReplace = new RegExp(`\\$\\{${key}\\}`, 'gi');
            d.replace(toReplace, this.config[key]);
        }
    }
}