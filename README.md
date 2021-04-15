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
const {replacer} = require('gpc-replacer');

let ast = compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new replacer({
        // config
    })
);
compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import {replace} from "gpc-template";

let ast = load("./features/src/login.feature");
ast = process(
    ast,
    new replace({
        // config
    })
);
save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-replacer/).

This package uses [debug](https://www.npmjs.com/package/debug) for logging.