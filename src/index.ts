import { PreCompiler } from "gherking";
import { Background, DataTable, DocString, Examples, Feature, Rule, Scenario, ScenarioOutline, Step, TableRow, Tag } from "gherkin-ast";
//eslint-disable-next-line @typescript-eslint/no-var-requires
//const debug = require("debug")("gpc:template");

type Config = {
    [key: string]: string;
};

class Replacer implements PreCompiler {
    config: Config;
    constructor(config: Config) {
        if (typeof config !== 'object') {
            throw new TypeError('Configuration is not an object: ' + config);
        }
        this.config = config;
    }

    _replaceAll<T, K extends keyof T>(obj: T, ...keys: K[]) {
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

    _replaceInTableRow(row: TableRow) {
        row.cells.forEach(cell => {
            this._replaceAll(cell, 'value');
        });
    }

    onFeature(feature: Feature) {
        this._replaceAll(feature, 'name', 'description');
    }

    onRule(rule: Rule) {
        this._replaceAll(rule, 'name', 'description');
    }

    onBackground(background: Background) {
        this._replaceAll(background, 'name', 'description');
    }

    onScenarioOutline(scenarioOutline: ScenarioOutline) {
        this._replaceAll(scenarioOutline, 'name', 'description');
    }

    onScenario(scenario: Scenario) {
        this._replaceAll(scenario, 'name', 'description');
    }

    onStep(step: Step) {
        this._replaceAll(step, 'text');
    }

    onTag(tag: Tag) {
        this._replaceAll(tag, 'name');
    }

    onExamples(examples: Examples) {
        this._replaceAll(examples, 'name');
    }

    onDocString(docString: DocString) {
        this._replaceAll(docString, 'content');
    }

    onDataTable(dataTable: DataTable) {
        dataTable.rows.forEach(row => {
            this._replaceInTableRow(row);
        })
    }

    onExampleRow(exampleRow: TableRow) {
        this._replaceInTableRow(exampleRow);
    }

    onExampleHeader(exampleHeader: TableRow) {
        this._replaceInTableRow(exampleHeader);
    }
}
export = Replacer
