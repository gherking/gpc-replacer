import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import Replacer = require("../src");

const loadTestFeatureFile = async (folder: "input" | "expected", file: string): Promise<Document> => {
    const ast = await load(`./tests/data/${folder}/${file}`);
    delete ast[0].uri;
    return ast[0];
}

describe("Replacer", () => {
    let featureWithRule: Document;
    let featureWithoutRule: Document;
    let empty: Document;

    beforeAll(async () => {
        featureWithRule = await loadTestFeatureFile("input", "withRule.feature");
        featureWithoutRule = await loadTestFeatureFile("input", "withoutRule.feature");
        empty = await loadTestFeatureFile("input", "empty.feature");
    });

    test("Should replace keywords in a full equipped feature file including rule", async () => {
        const testConfig = {
            keyword1: "value1",
            keyword2: "value2"
        }

        const expected = await loadTestFeatureFile("expected", "withRule.feature");
        const actual = process(featureWithRule, new Replacer(testConfig));

        pruneID(actual);
        pruneID(expected);

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });

    test("Should replace keywords in a full equipped feature file not including rule", async () => {
        const testConfig = {
            keyword1: "value1",
            keyword2: "value2"
        }

        const expected = await loadTestFeatureFile("expected", "withoutRule.feature");
        const actual = process(featureWithoutRule, new Replacer(testConfig));

        pruneID(actual);
        pruneID(expected);

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });

    test("Should not crash if feature is empty", async () => {
        const testConfig = {
            keyword1: "value1",
            keyword2: "value2"
        }

        const expected = await loadTestFeatureFile("expected", "empty.feature");
        const actual = process(empty, new Replacer(testConfig));

        pruneID(actual);
        pruneID(expected);

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });

    test("Should throw error is config is not an Object", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => process(featureWithRule, new Replacer("test" as any))).toThrow(/Configuration is not an object/);
    });
});