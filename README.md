# npm-prepublish

Allows you use to use a continuous testing tool (such as **Travis**) to deploy to npm on every semver-y tag.

This means you can use GitHub releases or git tags and have Travis deploy automagically for you to the npm registry.

## Warning

In order to use this tool please **set** the `version` key from your `package.json` to `0.0.0` (this is for compatibility reasons so that people can still install your module via its git URL because npm will refuse to install any package that doesn't have a version number - [issue raised here](https://github.com/npm/npm/issues/7105)).

If you really, really want to keep updating `version` in your `package.json` file you can use `npm-prepublish --lax` to skip this check).

## Installation

```sh
npm install --save-dev npm-prepublish
```

Simply add `prepublish` and `publish` into your `package.json`'s npm scripts like this:-

```json
[...]
  "scripts": {
    "prepublish": "npm-prepublish",
    "publish": "npm-prepublish-clean"
  }
[...]
```

Then, if you're using Travis, use `travis setup npm` to set up npm registry deployment as usual.

## Credits and collaboration ##

The lead developer of **npm-prepublish** is [Matt Andrews](http://twitter.com/andrewsmatt) at FT Labs. All open source code released by FT Labs is licenced under the MIT licence. We welcome comments, feedback and suggestions.  Please feel free to raise an issue or pull request.
