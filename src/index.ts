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
        row.cells.forEach(cell => {
            this.replaceAll(cell, 'value');
        });
    }

    onFeature(feature: Feature): void {
        this.replaceAll(feature, 'name', 'description');
    }

    onRule(rule: Rule): void {
        this.replaceAll(rule, 'name', 'description');
    }

    onBackground(background: Background): void {
        this.replaceAll(background, 'name', 'description');
    }

    onScenarioOutline(scenarioOutline: ScenarioOutline): void {
        this.replaceAll(scenarioOutline, 'name', 'description');
    }

    onScenario(scenario: Scenario): void {
        this.replaceAll(scenario, 'name', 'description');
    }

    onStep(step: Step): void {
        this.replaceAll(step, 'text');
    }

    onTag(tag: Tag): void {
        this.replaceAll(tag, 'name');
    }

    onExamples(examples: Examples): void {
        this.replaceAll(examples, 'name');
    }

    onDocString(docString: DocString): void {
        this.replaceAll(docString, 'content');
    }

    onTableRow(exampleRow: TableRow): void {
        this.replaceInTableRow(exampleRow);
    }
}
export = Replacer;
