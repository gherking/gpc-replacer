import { PreCompiler } from "gherking";
import { Background, DocString, Examples, Feature, Rule, Scenario, ScenarioOutline, Step, TableRow, Tag } from "gherkin-ast";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:replacer");

type Config = {
    [key: string]: string;
};

class Replacer implements PreCompiler {
    config: Config;

    constructor(config: Config) {
        debug('Initialize(config: %o)', config);
        if (typeof config !== 'object') {
            throw new TypeError('Configuration is not an object: ' + config);
        }
        this.config = config;
    }

    private replaceAll<T, K extends keyof T>(obj: T, ...keys: K[]): void {
        /* istanbul ignore next */
        debug('replaceAll(obj: %s, keys: %d)', obj?.constructor.name, keys.length);
        keys.forEach(key => {
            if (obj[key]) {
                Object.keys(this.config).forEach(toReplace => {
                    const replaceWith = this.config[toReplace];
                    //@ts-ignore
                    obj[key] = obj[key].replace(new RegExp('\\$\\{' + toReplace + '\\}', 'gi'), replaceWith);
                });
            }
        });
    }

    private replaceInTableRow(row: TableRow) {
        /* istanbul ignore next */
        debug('replaceInTableRow(row: %s)', row?.constructor.name);
        row.cells.forEach(cell => {
            this.replaceAll(cell, 'value');
        });
    }

    onFeature(feature: Feature): void {
        /* istanbul ignore next */
        debug('onFeature(f: %s)', feature?.constructor.name);
        this.replaceAll(feature, 'name', 'description');
    }

    onRule(rule: Rule): void {
        /* istanbul ignore next */
        debug('onRule(rule: %s)', rule?.constructor.name);
        this.replaceAll(rule, 'name', 'description');
    }

    onBackground(background: Background): void {
        /* istanbul ignore next */
        debug('onBackground(background: %s)', background?.constructor.name);
        this.replaceAll(background, 'name', 'description');
    }

    onScenarioOutline(scenarioOutline: ScenarioOutline): void {
        /* istanbul ignore next */
        debug('onScenarioOutline(scenarioOutline: %s)', scenarioOutline?.constructor.name);
        this.replaceAll(scenarioOutline, 'name', 'description');
    }

    onScenario(scenario: Scenario): void {
        /* istanbul ignore next */
        debug('onScenario(scenario: %s)', scenario?.constructor.name);
        this.replaceAll(scenario, 'name', 'description');
    }

    onStep(step: Step): void {
        /* istanbul ignore next */
        debug('onStep(scenario: %s)', step?.constructor.name);
        this.replaceAll(step, 'text');
    }

    onTag(tag: Tag): void {
        /* istanbul ignore next */
        debug('onTag(tag: %s)', tag?.constructor.name);
        this.replaceAll(tag, 'name');
    }

    onExamples(examples: Examples): void {
        /* istanbul ignore next */
        debug('onExamples(examples: %s)', examples?.constructor.name);
        this.replaceAll(examples, 'name');
    }

    onDocString(docString: DocString): void {
        /* istanbul ignore next */
        debug('onDocString(docString: %s)', docString?.constructor.name);
        this.replaceAll(docString, 'content');
    }

    onTableRow(exampleRow: TableRow): void {
        /* istanbul ignore next */
        debug('onTableRow(exampleRow: %s)', exampleRow?.constructor.name);
        this.replaceInTableRow(exampleRow);
    }
}
export = Replacer;
