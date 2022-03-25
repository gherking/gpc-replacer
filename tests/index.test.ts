import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import Replacer, { ReplacerConfig } from "../src";

const cleanLocationInfo = (ast: Document): void => {
    delete ast.sourceFile;
    delete ast.targetFile;
    delete ast.sourceFolder;
    delete ast.targetFolder;
}

const loadTestFeatureFile = async (folder: "input" | "expected", file: string): Promise<Document> => {
    const ast = await load(`./tests/data/${folder}/${file}`);
    cleanLocationInfo(ast[0]);
    return ast[0];
}

const checkConfig = async (testCase: string, config: ReplacerConfig): Promise<void> => {
    const input = await loadTestFeatureFile("input", `${testCase}.feature`);
    const expected = await loadTestFeatureFile("expected", `${testCase}.feature`);
    const actual = process(input, new Replacer(config));

    cleanLocationInfo(actual[0]);
    delete expected.uri;
    delete actual[0].uri;

    pruneID(actual);
    pruneID(expected);

    expect(actual).toHaveLength(1);
    expect(actual[0]).toEqual(expected);
}

describe("Replacer", () => {
    test("Should replace keywords in a full equipped feature file including rule", async () => {
        await checkConfig("withRule", {
            keyword1: "value1",
            keyword2: "value2"
        });
    });

    test("Should replace keywords in a full equipped feature file not including rule", async () => {
        await checkConfig("withoutRule", {
            keyword1: "value1",
            keyword2: "value2"
        });
    });

    test("should replace keywords in a feature file with comments", async () => {
        await checkConfig("withComment", {
            keyword1: "value1",
            keyword2: "value2"
        });
    });

    test("Should not crash if feature is empty", async () => {
        await checkConfig("empty", {
            keyword1: "value1",
            keyword2: "value2"
        });
    });

    test("Should throw error is config is not an Object", async () => {
        const input = await loadTestFeatureFile("input", "withRule.feature");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => process(input, new Replacer("test" as any)))
            .toThrow(/Configuration is not an object/);
    });
});