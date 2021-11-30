import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import Replacer = require("../src");

const loadTestFeatureFile = async (folder: "input" | "expected", file: string): Promise<Document> => {
    const ast = await load(`./tests/data/${folder}/${file}`);
    delete ast[0].uri;
    return ast[0];
}

describe("Replacer", () => {
    let base: Document;

    beforeAll(async () => {
        base = await loadTestFeatureFile("input", "test.feature");
    });

    test("Should replace keywords in the feature file", async () => {
        const testConfig = {
            keyword1: "value1",
            keyword2: "value2"
        }

        const expected = await loadTestFeatureFile("expected", "test.feature");
        const actual = process(base, new Replacer(testConfig));

        pruneID(actual);
        pruneID(expected);

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });

    test("Should throw error is config is not an Object", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => process(base, new Replacer("test" as any))).toThrow(/Configuration is not an object/);
    });
});