# gpc-replacer

![Downloads](https://img.shields.io/npm/dw/gpc-replacer?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/gpc-replacer?label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-replacer/master?label=version%40git&style=flat-square)
![CI](https://img.shields.io/github/workflow/status/gherking/gpc-replacer/CI/master?label=ci&style=flat-square)
![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-replacer/Docs/master?label=docs&style=flat-square)

This GherKing Precompiler is responsible to replace keys in feature files with given values.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const Replacer = require('gpc-replacer');

let ast = await compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new Replacer({
        // config
        stringToBeReplaced1: "stringToReplaceWith1",
        stringToBeReplaced2: "stringToReplaceWith2",
    })
);
await compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import Replacer from "gpc-replacer";

let ast = await load("./features/src/login.feature");
ast = process(
    ast,
    new Replacer({
        // config
        stringToBeReplaced1: "stringToReplaceWith1",
        stringToBeReplaced2: "stringToReplaceWith2",
    })
);
await save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

This Replacer is responsible for exchanging predefined strings in the
feature files. It inserts the provided text in the place held for them.

As an input it needs the feature file to be modified, and a config
json file, which contains the words to be replaced, and the words
to replace them with. It is a regular json, where the keys are the
words need replacing, and their values are the words they will get
replaced by.
In case the config file is not available, or its format is incorrect
the Replacer throws an error.

It replaces strings given in a format '${to_replace}' in the input
feature.
It can find and replace such strings in the following parts of a
feature file:

* Feature: name, description
* Rule: name, description
* Background: name, description
* Scenario Outline: name, decription
* Scenario: name, description
* Step: text
* Tag: name
* Examples: name
* Document string: content
* Data table: header name, cell values

See examples for the input files and an output in the test/data folder.

## Other

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:replacer` :

```shell
DEBUG=gpc:replacer* gherking ...
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-replacer/).